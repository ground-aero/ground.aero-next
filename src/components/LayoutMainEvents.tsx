// Sub-component to MAIN // src/components/LayoutMainEvents.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../app/page.module.css'

type TLayoutMainEvents = {
  layout: 'home' | 'events' | 'library' | 'sgha',
  // title: string | null, 
  // text: string | null,
  // children: React.ReactNode;
  events: {
    linkHref: string,
    imgSrc: string,
    imgAlt: string,
    content: string,
  }[],
};

export const LayoutMainEvents: React.FC<TLayoutMainEvents> = ({ layout, events }) => {
  return (
    <>
      {layout==='events' ? (
        <> 
          <div id={styles.main_box} className={styles.box__content}>
            {/* <p className={styles.intro_main_title}>{title}</p> */}
            {/* <h1 className={styles.intro__text}>{text}</h1> */}

            {/* <ScrapedEvents layout={'events'}/> */}

            <ul id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>

              {/* {events && events.map((event, i, arr) => (
                <li key={i} className={styles.events__item}>
                  <img src={event.imgSrc} alt={event.imgAlt} className={styles.img__event_card}/>
                  <h3 className={styles.events__item_text}>{`Заголовок: ${event.title}`}</h3>
                  <p className={styles.events__item_text}>{`Тело: ${event.content}`}</p>
                </li>
              ))} */}
              {events && events.map((event, i) => (
                <li key={i} className={styles.events__item}>
                  <Link href={`https://www.iata.org${event.linkHref}`} className={styles.events__link} target={'_blank'}>
                    <img src={`https://www.iata.org${event.imgSrc}`} className={styles.img__event_card} alt={event.imgAlt} width={375} height={213}/>
                    <div dangerouslySetInnerHTML={{ __html: event.content }} />
                  </Link>
              </li>
            ))}

              {/* <ScrapedEvents layout={'home'}/> */}
            </ul>

          </div>

          <aside id={styles.aside_box} className={`${styles.aside_box} ${styles.aside_box_type_events}`}>
            <div className={`${styles.empty__inner} ${styles.box__empty_center}`}> 
              <Image
                  src="/images/arrows2.png" alt="arrows" width={22} height={22} className={styles.img__arrows_transform}
              /> 
              <h3 className={styles.intro__title}>{'Events'}</h3>
            </div>
          </aside>
        </>) : ''
      }
    </>
  );
};