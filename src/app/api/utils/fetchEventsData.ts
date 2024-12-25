import axios from 'axios';
import * as cheerio from 'cheerio';

export type EventData = {
    linkHref: string | '',
    imgSrc: string | '',
    imgAlt: string | '',
    content: string | '',
};

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
  linkHref: string;
  imgSrc: string;
  imgAlt: string;
}

export const fetchEventsDataIATA: () => Promise<EventData[]> = async () => {
  const url = 'https://www.iata.org/en/events/';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    const eventItems: EventData[] = $('.global-event-list-item-wrapper').map((_, element) => {
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

  console.log('eventItems iATA::::', eventItems)
    return eventItems;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw new Error('Failed to fetch event data');
  }
}

export const fetchEventsAirportInfo: () => Promise<EventData[]> = async () => {
  const url = 'https://www.ghiconferences.com/';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    const eventItems: EventData[] = [];

    $('li[class^="ghi-"]').each((_, element) => {

      const item = $(element).find('a');

      const linkHref = item.attr('href') || '';
      const img = item.find('img');
      const imgSrc = img.attr('src') || '';
      const imgAlt = img.attr('alt') || '';

      const content = item.find('.grid.gap-y-2').html() || '';

      eventItems.push({
        linkHref,
        imgSrc,
        imgAlt,
        content,
      });
    });

 // console.log('eventItems::', eventItems);
    return eventItems;
  } catch (error) {
    console.error('Error fetching the URL AIRPORT / AIRLINES:', error);
    throw new Error('Failed to fetch event data AIRPORT / AIRLINES::');
  }
}

export function sortEventsByDate(
    events: UnifiedEventData[],
    ascending: boolean = true
): UnifiedEventData[] {
  return events.sort((a, b) => {
    const dateA = new Date(a.dates.start).getTime();
    const dateB = new Date(b.dates.start).getTime();

    // Если ascending = true, сортируем по возрастанию, иначе по убыванию
    return ascending
        ? dateA - dateB
        : dateB - dateA;
  });
}

// исходные данные унифицируем в единый формат
export function unifyEventData(iataEvents: EventData[], airportEvents: EventData[]): UnifiedEventData[] {
  const unifiedIataEvents = iataEvents.map((event, index) => {
    const $ = cheerio.load(event.content);

    const parsedDates = parseDateRange($('.global-event-list-item-date').text().trim());

  console.log(parsedDates)

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

  const unifiedAirportEvents = airportEvents.map((event, index) => {
    const $ = cheerio.load(event.content);

    const dateSpan = $('span').eq(0).text().trim();
    const titleSpan = $('span').eq(1).text().trim();
    const venueSpan = $('span').eq(2).text().trim();

    const parsedDates = parseDateRange(dateSpan);

    return {
      id: `airport-${index}`,
      title: titleSpan,
      venue: venueSpan,
      dates: {
        start: parsedDates.start,
        end: parsedDates.end,
        formatted: formatDateRange(parsedDates.start, parsedDates.end)
      },
      linkHref: event.linkHref.startsWith('http')
          ? event.linkHref
          : `https://www.ghiconferences.com${event.linkHref}`,
      imgSrc: event.imgSrc,
      imgAlt: event.imgAlt
    };
  });

  return sortEventsByDate([...unifiedIataEvents, ...unifiedAirportEvents]);
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

// Функция для получения индекса месяца
  return monthNames.findIndex(m =>
      m.toLowerCase() === month.toLowerCase().substring(0, 3)
  );
}
