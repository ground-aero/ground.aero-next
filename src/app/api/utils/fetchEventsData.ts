import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchEventsData = async () => {
  const url = 'https://www.iata.org/en/events/';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(data);

    const eventItems = $('.global-event-list-item-wrapper').map((_, element) => {
      const wrapper = $(element);

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

    return eventItems;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw new Error('Failed to fetch event data');
  }
};