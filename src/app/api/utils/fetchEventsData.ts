import axios from 'axios';
import * as cheerio from 'cheerio';

// base type unified
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

export type TEventIATA = TBaseEvent & {
  source: 'IATA',
  rawContent?: string; // сохр. оригинальный контент для безопасности
};

export type TEventROUTES = TBaseEvent & {
  source: 'ROUTES';
};

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
      const linkContent = wrapper.find('.global-event-list-item');
      const content = linkContent.find('.global-event-list-item-content');

      // parse content into structured data
      const title = content.find('.global-event-list-title').text().trim()
      const venue = content.find('.global-event-list-item-venue').text().trim()
      const dateText = content.find('.global-event-list-item-date').text().trim()
      const parsedDates = parseIataDateRange(dateText)

      const link = linkContent.attr('href') || '';
      const img = linkContent.find('.global-event-list-item-img').attr('src');
      const alt = linkContent.find('.global-event-list-item-img').attr('alt');

      return {
        source: 'IATA',
        title,
        date: {
          start: parsedDates.start,
          end: parsedDates.end,
        },
        linkHref: link ? `https://www.iata.org${link}` : '',
        // linkHref: link.attr('href') || '',
        imgSrc: img ? `https://www.iata.org${img}` : '',
        imgAlt: alt ? img : '',
        venue,
        rawContent: content.html() || '', // Сохраняем оригинальный HTML на всякий случай
      };
    }).get();

  // console.log('eventsList iATA::::', eventsList)
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
            source: 'ROUTES',
            title,
            date: { start, end },
            linkHref: link.startsWith('http') ? link : `https://www.routesonline.com${link}`,
            imgSrc,
            imgAlt,
            venue,
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

// Basic func, to get all data unified, handles partial success
export async function getAllEvents(): Promise<TUnifiedEvent[]> {
  const [iataEvents, routesEvents] = await Promise.allSettled([
    fetchEventsIATA(),
    fetchEventsROUTES()
  ]);

  const events: TUnifiedEvent[] = [];

  if (iataEvents.status === 'fulfilled') {
    events.push(...iataEvents.value.map(event => ({
      id: `iata-${event.title}`,
      ...event,
      dates: {
        start: event.date.start,
        end: event.date.end,
        formatted: formatDateRange(event.date.start, event.date.end)
      }
    })));
  }

  if (routesEvents.status === 'fulfilled') {
    events.push(...routesEvents.value.map(event => ({
      id: `routes-${event.title}`,
      ...event,
      dates: {
        start: event.date.start,
        end: event.date.end,
        formatted: formatDateRange(event.date.start, event.date.end)
      }
    })));
  }

  if (routesEvents.status === 'rejected') {
    console.error('Failed to fetch Routes events:', routesEvents.reason);
  }

  return sortEventsByDate(events);
}

// helpers ----------------------------------------------------------------
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
