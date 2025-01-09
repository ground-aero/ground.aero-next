import axios from 'axios';
import * as cheerio from 'cheerio';

export type EventIATA = {
  linkHref: string | '',
  imgSrc: string | '',
  imgAlt: string | '',
  content: string | '',
};

export type EventICAO = {
  title: string | '',
  link: string | '',
  date: {
    start: string | '';
    end: string | '';
  },
  venue: string | '',
}

// Для унификации данных общий интерфейс
export interface UnifiedEventData {
  id: string;
  title: string;
  venue: string;
  dates: {
    start: string;
    end: string;
    formatted: string;  // Новое поле
  };
  linkHref: string | '';
  imgSrc: string | '';
  imgAlt: string | '';
}

// help func, unify IATA events only
function unifyIATAEventsOnly(iataEvents: EventIATA[]): UnifiedEventData[] {
  return iataEvents.map((event, index) => {
    const $ = cheerio.load(event.content);
    const parsedDates = parseDateRange($('.global-event-list-item-date').text().trim());

    return {
      id: `iata-${index}`,
      title: $('h4.global-event-list-title').text().trim(),
      venue: $('.global-event-list-item-venue').text().trim(),
      dates: {
        start: parsedDates.start,
        end: parsedDates.end,
        formatted: formatDateRange(parsedDates.start, parsedDates.end)
      },
      linkHref: event.linkHref.startsWith('http')
        ? event.linkHref
        : `https://www.iata.org${event.linkHref}`,
      imgSrc: event.imgSrc.startsWith('http')
        ? event.imgSrc
        : `https://www.iata.org${event.imgSrc}`,
      imgAlt: event.imgAlt
    };
  });
}

export const fetchEventsIATA: () => Promise<EventIATA[]> = async () => {
  const url = 'https://www.iata.org/en/events/';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    const eventsList: EventIATA[] = $('.global-event-list-item-wrapper').map((_, element) => {
      const wrapper = $(element);

  // console.log('wrapper:', wrapper)
      const link = wrapper.find('.global-event-list-item');

      const linkHref = link.attr('href') || '';

      const img = link.find('.global-event-list-item-img');
      const imgSrc = img.attr('src') || '';
      const imgAlt = img.attr('alt') || '';

      const content = link.find('.global-event-list-item-content').html() || '';

      return {
        linkHref,
        imgSrc,
        imgAlt,
        content,
      };
    }).get();

  console.log('eventsList iATA::::', eventsList)
    return eventsList;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw new Error('Failed to fetch event data');
  }
}

export const fetchEventsICAO: () => Promise<EventICAO[]> = async () => {
  const url = 'https://www.icao.int/meetings/pages/upcoming.aspx';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);
    const events: EventICAO[] = [];

  console.log('$--------------=-', $)
    // Находим все строки таблицы, исключая заголовок
    $('#slider').each((_, element) => {
      const row = $(element);

      // Ищем элементы внутри конкретных div с id
      const titleDiv = row.find('div#MeetingsEventsTitle');
      const dateDiv = row.find('div#MeetingsEventsDate');
      const addressDiv = row.find('div#MeetingsEventsAddress');

      // Извлекаем данные
      const titleElement = titleDiv.find('a');
      const title = titleElement.text().trim();
      const link = titleElement.attr('href') || '';

      // Извлекаем и форматируем дату
      const dateText = dateDiv.text().trim();
      const [startDate, endDate] = dateText.split(' - ').map(d => d.trim());

      // Получаем место проведения
      const venue = addressDiv.text().trim();

      // Добавляем событие только если есть заголовок
      if (title) {
        events.push({
          title,
          link: link.startsWith('http') ? link : `https://www.icao.int${link}`,
          date: {
            start: startDate || '',
            end: endDate || ''
          },
          venue
        });
      }
    });

    return events
    // Сортируем события по дате начала
    // return events.sort((a, b) => {
    //   const dateA = new Date(a.date.start).getTime();
    //   const dateB = new Date(b.date.start).getTime();
    //   return dateA - dateB;
    // });

  } catch (error) {
    console.error('Error fetching ICAO events:', error);
    throw new Error('Failed to fetch ICAO events data');
  }
};

export function sortEventsByDate(
  events: UnifiedEventData[],
  ascending: boolean = true
): UnifiedEventData[] {
  return events.sort((a, b) => {
    const dateA = new Date(a.dates.start).getTime();
    const dateB = new Date(b.dates.start).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

// Основная функция для получения унифицированных данных
export async function getAllEvents(): Promise<UnifiedEventData[]> {
  let dataIATA: EventIATA[] = [];
  let dataICAO: EventICAO[] = [];
  let unifiedEvents: UnifiedEventData[] = [];

  // Получаем данные IATA
  try {
    dataIATA = await fetchEventsIATA();
    if (dataIATA.length === 0) {
      console.warn('No IATA events found');
    }
  } catch (error) {
    console.error('Failed to fetch IATA events:', error);
    dataIATA = []; // Обеспечиваем пустой массив при ошибке
  }

  // Получаем данные ICAO
  try {
    dataICAO = await fetchEventsICAO();
    if (dataICAO.length === 0) {
      console.warn('No ICAO events found');
    }
  } catch (error) {
    console.error('Failed to fetch ICAO events:', error);
    dataICAO = []; // Обеспечиваем пустой массив при ошибке
  }

  // Попытка объединить данные
  try {
    // Сначала пробуем объединить все доступные данные
    unifiedEvents = unifyEventsData(dataIATA, dataICAO);

    // Если объединение не удалось, но есть данные IATA, создаем упрощенный унифицированный формат
    if (unifiedEvents.length === 0 && dataIATA.length > 0) {
      unifiedEvents = unifyIATAEventsOnly(dataIATA);
    }
  } catch (error) {
    console.error('Failed to unify events:', error);
    // Если объединение не удалось, но есть данные IATA, используем только их
    if (dataIATA.length > 0) {
      try {
        unifiedEvents = unifyIATAEventsOnly(dataIATA);
      } catch (secondaryError) {
        console.error('Failed to unify IATA events:', secondaryError);
        unifiedEvents = [];
      }
    } else {
      unifiedEvents = [];
    }
  }

  return sortEventsByDate(unifiedEvents);
}

export function unifyEventsData(iataEvents: EventIATA[], icaoEvents: EventICAO[]): UnifiedEventData[] {
  // Унификация IATA событий
  const unifiedIataEvents = iataEvents.map((event, index) => {
    const $ = cheerio.load(event.content);
    const parsedDates = parseDateRange($('.global-event-list-item-date').text().trim());

    return {
      id: `iata-${index}`,
      title: $('h4.global-event-list-title').text().trim(),
      venue: $('.global-event-list-item-venue').text().trim(),
      dates: {
        start: parsedDates.start,
        end: parsedDates.end,
        formatted: formatDateRange(parsedDates.start, parsedDates.end)
      },
      linkHref: event.linkHref.startsWith('http')
        ? event.linkHref
        : `https://www.iata.org${event.linkHref}`,
      imgSrc: event.imgSrc.startsWith('http')
        ? event.imgSrc
        : `https://www.iata.org${event.imgSrc}`,
      imgAlt: event.imgAlt
    };
  });

  // Унификация ICAO событий
  const unifiedIcaoEvents = icaoEvents.map((event, index) => {
    return {
      id: `icao-${index}`,
      title: event.title,
      venue: event.venue,
      dates: {
        start: new Date(event.date.start).toISOString(),
        end: new Date(event.date.end).toISOString(),
        formatted: formatDateRange(
          new Date(event.date.start).toISOString(),
          new Date(event.date.end).toISOString()
        )
      },
      linkHref: event.link,
      imgSrc: '', // ICAO события обычно не содержат изображений
      imgAlt: ''
    };
  });

  // Объединяем и сортируем все события
  return sortEventsByDate([...unifiedIataEvents, ...unifiedIcaoEvents]);
}

// Вспомогательная функция для парсинга диапазона дат
function parseDateRange(dateString: string): { start: string, end: string } {
  try {
    // Clean the input string
    const cleanDateString = dateString.trim();

    // Regular expressions to match date patterns
    const dateWithYearRegex = /(\d{1,2})\s*-\s*(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i;
    const dateWithoutYearRegex = /(\d{1,2})\s*-\s*(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*/i;

    let startDay: number, endDay: number, month: string, year: number;

    // Try to match with year first
    const matchWithYear = cleanDateString.match(dateWithYearRegex);
    if (matchWithYear) {
      // @ts-ignore
      [, startDay, endDay, month, year] = matchWithYear;
    } else {
      // Try to match without year
      const matchWithoutYear = cleanDateString.match(dateWithoutYearRegex);
      if (matchWithoutYear) {
        // @ts-ignore
        [, startDay, endDay, month] = matchWithoutYear;
        year = new Date().getFullYear(); // Use current year if not specified
      } else {
        throw new Error('Invalid date format');
      }
    }

    // Get month index (0-11)
    const monthIndex = getMonthIndex(month);
    if (monthIndex === -1) throw new Error('Invalid month');

    // Create Date objects
    // @ts-ignore
    const startDate = new Date(year, monthIndex, parseInt(startDay));
    // @ts-ignore
    const endDate = new Date(year, monthIndex, parseInt(endDay));

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date');
    }

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    };
  } catch (error) {
    console.error('Error parsing date:', dateString, error);
    // Return current date as fallback
    const fallbackDate = new Date();
    return {
      start: fallbackDate.toISOString(),
      end: fallbackDate.toISOString()
    };
  }
}

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = monthNames[startDate.getMonth()];
  const endMonth = monthNames[endDate.getMonth()];
  const year = startDate.getFullYear();
  const currentYear = new Date().getFullYear();

  // Same month format
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDay} - ${endDay} ${startMonth}${year !== currentYear ? ` ${year}` : ''}`;
  }

  // Different months format
  return `${startDay} ${startMonth} - ${endDay} ${endMonth}${year !== currentYear ? ` ${year}` : ''}`;
}

function getMonthIndex(month: string): number {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

// Получение индекса месяца
  return monthNames.findIndex(m =>
      m.toLowerCase() === month.toLowerCase().substring(0, 3)
  );
}
