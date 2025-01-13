import axios from 'axios';
import * as cheerio from 'cheerio';

// base type unified for any event
type TBaseEvent = {
  title: string | '',
  date: {
    start: string | '';
    end: string | '';
  },
  linkHref: string | '',
  imgSrc: string | '',
  imgAlt: string | '',
  venue: string | '',
}

export type TEventIATA = {
  content: string | '',
  linkHref: string | '',
  imgSrc: string | '',
  imgAlt: string | '',
};

export type TEventROUTES = {
  title: string | '',
  date: {
    start: string | '';
    end: string | '';
  },
  linkHref: string | '',
  imgSrc: string | '',
  imgAlt: string | '',
  venue: string | '',
}

export interface TUnifiedEvent {
  id: string; // new field
  linkHref: string | '';
  imgSrc: string | '';
  imgAlt: string | '';
  title: string;
  dates: {
    start: string;
    end: string;
    formatted: string; // new field
  };
  venue: string;
}

export const fetchEventsIATA: () => Promise<TEventIATA[]> = async () => {
  const url = 'https://www.iata.org/en/events/';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    const eventsList: TEventIATA[] = $('.global-event-list-item-wrapper').map((_, element) => {
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

export async function fetchEventsROUTES(): Promise<TEventROUTES[]> {
  const url = 'https://www.routesonline.com/events/';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);
    const events: TEventROUTES[] = [];

    $('li.eventTile').each((_, element) => {
      const item = $(element);

      const titleElement = item.find('h2.tile_title a');
      const title = titleElement.text().trim();
      const link = titleElement.attr('href') || '';

      const metadata = item.find('p.eventTile_metadata');
      const venue = metadata.find('strong').text().trim();
      // Извлекаем текст даты, удаляя venue
      const dateText = metadata.text().replace(venue, '').trim();

      const img = item.find('a img');
      const imgSrc = img.attr('src') || '';
      const imgAlt = img.attr('alt') || '';

      if (title && dateText) {
        try {
          const { start, end } = parseRoutesDateRange(dateText);

          events.push({
            title,
            linkHref: link.startsWith('http') ? link : `https://www.routesonline.com${link}`,
            date: { start, end },
            venue,
            imgSrc,
            imgAlt,
          });
        } catch (error) {
          console.error(`Failed to parse event: ${title}`, error);
        }
      }
    });

    return events;
  } catch (error) {
    console.error('Error fetching Routes events:', error);
    throw new Error('Failed to fetch Routes events');
  }
}

// Basic func, to get all data unified
export async function getAllEvents(): Promise<TUnifiedEvent[]> {
  let dataIATA: TEventIATA[] = [];
  let dataROUTES: TEventROUTES[] = [];
  let unifiedEvents: TUnifiedEvent[] = [];

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

  // Получаем данные ROUTES
  try {
    dataROUTES = await fetchEventsROUTES();
    if (dataROUTES.length === 0) {
      console.warn('No ROUTES events found');
    }
  } catch (error) {
    console.error('Failed to fetch ROUTES events:', error);
    dataROUTES = []; // Обеспечиваем пустой массив при ошибке
  }

console.log('dataROUTES getAllEvents ::', dataROUTES)
  // Попытка объединить данные
  try {
    // Сначала пробуем объединить все доступные данные
    unifiedEvents = unifyEventsData(dataIATA, dataROUTES);

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

// helpers ----------------------------------------------------------------
function unifyIATAEventsOnly(iataEvents: TEventIATA[]): TUnifiedEvent[] {
  return iataEvents.map((event, index) => {
    const $ = cheerio.load(event.content);
    const parsedDates = parseIataDateRange($('.global-event-list-item-date').text().trim());

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

export function unifyEventsData(iataEvents: TEventIATA[], routesEvents: TEventROUTES[]): TUnifiedEvent[] {
  // Унификация IATA событий (оставляем как есть)
  const unifiedIataEvents = iataEvents.map((event, index) => {
    const $ = cheerio.load(event.content);
    const parsedDates = parseIataDateRange($('.global-event-list-item-date').text().trim());

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

  // Improved унификация Routes событий
  const unifiedRoutesEvents = routesEvents.map((event, index) => {
    return {
      id: `routes-${index}`,
      title: event.title,
      venue: event.venue,
      dates: {
        start: event.date.start,
        end: event.date.end,
        formatted: formatDateRange(event.date.start, event.date.end)
      },
      linkHref: event.linkHref,
      imgSrc: event.imgSrc,
      imgAlt: event.imgAlt
    };
  });

  // Объединяем и сортируем все события
  return sortEventsByDate([...unifiedIataEvents, ...unifiedRoutesEvents]);
}

export function sortEventsByDate(
  events: TUnifiedEvent[],
  ascending: boolean = true
): TUnifiedEvent[] {
  return events.sort((a, b) => {
    const dateA = new Date(a.dates.start).getTime();
    const dateB = new Date(b.dates.start).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

function parseRoutesDateRange(dateText: string): { start: string, end: string } {
  try {
    // Нормализуем различные виды тире и дефисов в стандартный дефис
    const normalizedText = dateText.replace(/[–—]/g, '-');

    // Паттерны для различных форматов дат
    const rangePattern = /(\d{1,2})\s*-\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/;
    const singleDatePattern = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/;

    // Сначала пробуем найти диапазон дат
    const rangeMatch = normalizedText.match(rangePattern);
    if (rangeMatch) {
      const [_, startDay, endDay, month, year] = rangeMatch;
      const monthIndex = getMonthIndex(month);

      if (monthIndex === -1) {
        throw new Error(`Invalid month: ${month}`);
      }

      const startDate = new Date(
        parseInt(year),
        monthIndex,
        parseInt(startDay)
      );

      const endDate = new Date(
        parseInt(year),
        monthIndex,
        parseInt(endDay)
      );

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date creation for range');
      }

      return {
        start: startDate.toISOString(),
        end: endDate.toISOString()
      };
    }

    // Если диапазон не найден, ищем одиночную дату
    const singleMatch = normalizedText.match(singleDatePattern);
    if (singleMatch) {
      const [_, day, month, year] = singleMatch;
      const monthIndex = getMonthIndex(month);

      if (monthIndex === -1) {
        throw new Error(`Invalid month: ${month}`);
      }

      const date = new Date(
        parseInt(year),
        monthIndex,
        parseInt(day)
      );

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date creation for single date');
      }

      // Для одиночной даты используем ту же дату как начало и конец
      return {
        start: date.toISOString(),
        end: date.toISOString()
      };
    }

    throw new Error(`Could not parse date format: ${dateText}`);
  } catch (error) {
    console.error('Error parsing Routes date:', dateText, error);
    // В случае ошибки возвращаем текущую дату
    const fallbackDate = new Date();
    return {
      start: fallbackDate.toISOString(),
      end: fallbackDate.toISOString()
    };
  }
}

function parseIataDateRange(dateString: string): { start: string, end: string } {
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
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return 'Date TBD';
    }

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = monthNames[startDate.getMonth()];
    const endMonth = monthNames[endDate.getMonth()];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const currentYear = new Date().getFullYear();

    // Если даты совпадают (одиночная дата)
    if (start === end) {
      return `${startDay} ${startMonth}${startYear !== currentYear ? ` ${startYear}` : ''}`;
    }

    // Разные годы
    if (startYear !== endYear) {
      return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
    }

    // Тот же месяц
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDay} - ${endDay} ${startMonth}${startYear !== currentYear ? ` ${startYear}` : ''}`;
    }

    // Разные месяцы
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}${startYear !== currentYear ? ` ${startYear}` : ''}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Date TBD';
  }
}

function getMonthIndex(month: string): number {
  const monthFormats = {
    'january': 0, 'jan': 0,
    'february': 1, 'feb': 1,
    'march': 2, 'mar': 2,
    'april': 3, 'apr': 3,
    'may': 4,
    'june': 5, 'jun': 5,
    'july': 6, 'jul': 6,
    'august': 7, 'aug': 7,
    'september': 8, 'sep': 8, 'sept': 8,
    'october': 9, 'oct': 9,
    'november': 10, 'nov': 10,
    'december': 11, 'dec': 11
  };

  const normalizedMonth = month.toLowerCase();
  // @ts-ignore
  return monthFormats[normalizedMonth] ?? -1;
}
