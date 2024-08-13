import React from 'react';
import { fetchEventsData } from '../../../app/api/utils/fetchEventsData';
import styles from '../../../app/page.module.css';

type TLayoutMainProps = {
    layout: 'home' | 'events' | 'library',
  };

export const ScrapedEvents:React.FC<TLayoutMainProps> = async ({ layout }) => {

  try {
    const eventItems = await fetchEventsData();

    return (
        <>
        {layout==='home'? (
        <>
            <h1>Event Items</h1>
            {eventItems.length > 0 ? (
                <ul id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
                {eventItems.map((item, index) => (
                    <li key={index} className={styles.list_style_type_events}>
                        <a href={`https://www.iata.org${item.linkHref}`} target={'_blank'}>
                        <img src={`https://www.iata.org${item.imgSrc}`} className={styles.imgCard} alt={item.imgAlt} />
                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </a>
                    </li>
                ))}
                </ul>
            ) : (
            <p>No event items found.</p>
            )}

        </>
        ) : ""
        }
      </>
    );

  } catch (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>Could not fetch the URL.</p>
      </div>
    );
  }
};
