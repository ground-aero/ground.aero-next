// Sub-component to MAIN // src/components/LayoutMainEvents.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../app/page.module.css'
import {UnifiedEventData} from "@/app/api/utils/fetchEventsData";

type TLayoutMainEvents = {
  layout: 'home' | 'events' | 'library' | 'sgha',
  events: UnifiedEventData[],
};

export const LayoutMainEvents: React.FC<TLayoutMainEvents> = ({ layout, events }) => {

  return (
    <>
      {layout==='events' && (
        <> 
            <div id={styles.banner_header_events} className={`${styles.box__empty_center} ${styles.box__empty_right} ${styles.box__empty}`}>
                <div className={styles.empty__inner}></div>
            </div>

            <section id={styles.main_box} className={styles.box__content}>
              <h1 className={styles.semantic_tag_invisible}>air transport events, aviation exhibitions</h1>
              { events.length === 0 ? (
                <div id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
                  <p className={`${styles.events__item} ${styles.events__item_notavailable}`}>No events available at the moment. Please check back later.</p>
                </div>
              ) : (
                <ul id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
                  { events.map((event, i) => (
                    <li key={i} className={styles.events__item}>
                      <Link href={`${event.linkHref}`} className={styles.events__link}
                            target={'_blank'}>
                      {/*<Link href={`https://www.iata.org${event.linkHref}`} className={styles.events__link}*/}
                      {/*      target={'_blank'}>*/}
                        <img src={`${event.imgSrc}`} className={styles.img__event_card}
                             alt={event.imgAlt} width={375} height={213}/>
                        {/*<img src={`https://www.iata.org${event.imgSrc}`} className={styles.img__event_card}*/}
                        {/*     alt={event.imgAlt} width={375} height={213}/>*/}

                        <div className={styles.img__event_title}>{event.title}</div>
                        <div>{event.venue}</div>
                        <div>{event.dates.formatted}</div>
                        {/*<div dangerouslySetInnerHTML={{ __html: event.content }} />*/}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

          <aside id={styles.aside_box} className={`${styles.aside_box} ${styles.aside_box_events}`}>
            <div className={`${styles.empty__inner} ${styles.box__empty_center}`}>
              <Image
                  src="/images/arrows2.png" alt="arrows" width={22} height={22} className={styles.img__arrows_transform}
              />
              <h3 className={styles.intro__title}>{'Events'}</h3>
            </div>
          </aside>
        </>)
      }
    </>
  )};