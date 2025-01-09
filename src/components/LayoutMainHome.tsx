// Sub-component to <main> at HomePage // src/components/LayoutMainHome.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../app/page.module.css'
import {intro} from "@/constants"
import FormattedText from "../utils/FormattedText"
import {UnifiedEventData} from "@/app/api/utils/fetchEventsData";

type TLayoutMainHome = {
  layout: 'home' | 'events' | 'library',
  title: string, 
  text: string,
  titleFacts: string,
  textFacts: {factOne: string, factTwo: string, factThree: string, factFour: string, factFive: string},
  titlePublications: string,
  titleEvents: string,
  events: UnifiedEventData[],
};

export const LayoutMainHome: React.FC<TLayoutMainHome> = (
    {
      layout,
      title,
      text,
      titleFacts,
      titlePublications,
      textFacts,
      titleEvents,
      events
    }) => {
  return (
    <>
      { layout==='home' && (
        <> 
{/* INTRO Section ----------------------------------------------*/}
{/* Intro */}
          <div id={styles.intro__box_center} className={`${styles.intro__box_center} ${styles.box__content} ${styles.box__content_main}`}>
            <div className={`${styles.box__content_center} ${styles.box__content_left}`}>
              <span className={styles.decor_bar}></span>
              <p className={`${styles.intro__title} ${styles.intro__title_left}`}>{title}</p>
            </div>
            <div className={styles.intro__text}>
                <FormattedText text={intro.main.text} />
            </div>
          </div>

{/* Facts */}
          <div id={styles.intro__box_left} className={`${styles.aside_box}`}>
            <Link href="#" className={`${styles.card} ${styles.box__empty_center} ${styles.box__empty_left}`} target="_self" rel="noopener noreferrer">
              <div className={`${styles.empty__inner} ${styles.empty__inner_reverse}`}>
                  <Image
                    src="/images/facts_n_figures.png" alt="facts & figures" width={28} height={28} className={styles.img__responsive_square}
                  />
                  <p className={styles.intro__title}>{titleFacts}</p>
              </div>
            </Link>
            
            <ul className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
              <li className={`${styles.intro__text} ${styles.intro__text_left} ${styles.intro__text_type_facts}`}>{textFacts.factOne}</li>
              <li className={`${styles.intro__text} ${styles.intro__text_left} ${styles.intro__text_type_facts}`}>{textFacts.factTwo}</li>
              <li className={`${styles.intro__text} ${styles.intro__text_left} ${styles.intro__text_type_facts}`}>{textFacts.factThree}</li>
              <li className={`${styles.intro__text} ${styles.intro__text_left} ${styles.intro__text_type_facts}`}>{textFacts.factFour}</li>
              <li className={`${styles.intro__text} ${styles.intro__text_left} ${styles.intro__text_type_facts}`}>{textFacts.factFive}</li>
              <li></li>
            </ul>
          </div>

{/* Publications */}
          <aside id={styles.introBoxRight} className={`${styles.aside_box} ${styles.aside__border_left}`}>
            <Link href="/sgha2018" className={`${styles.box__empty_center} ${styles.box__empty_right}`} target="_self" rel="noopener noreferrer">
              <div className={styles.empty__inner}> 
                <p className={styles.intro__title}>{titlePublications}</p>
                <Image
                    src="/images/arrows2.png" alt="arrows" width={28} height={28} className={styles.img__responsive_square}
                  />                      
              </div>
            </Link>
            <div className={`${styles.intro__box_center} ${styles.box__content} ${styles.box__content_main}`}>
              <div className={styles.box__inner_content}>
                <h1 className={`${styles.intro__title_small}`}>IATA Standard<br/>
                  Ground Handling<br/>
                  Agreement /AHM 810 /<br/>
                </h1>
                <p className={`${styles.intro__text} ${styles.intro__text_italic} ${styles.intro__text_center}`}>Overview</p>
                <Link href="/sgha2018" className={styles.link__sgha}>SGHA 2018</Link>
              </div>
            </div>      
          </aside>

{/* EVENTS Section -----------------------------------------------------*/}
{/* header banner */}
              <Link href="/events" id={styles.banner_header} className={`${styles.box__empty_center} ${styles.box__empty_right} ${styles.box__empty}`} target="_self" rel="noopener noreferrer">
                  <div className={styles.empty__inner}> 
                    <p className={`${styles.intro__title} ${styles.intro__title_large}`}>{titleEvents}</p>
                    <Image
                        src="/images/arrows2.png" alt="arrows" width={28} height={28} className={styles.img__responsive_square}
                      />                      
                  </div>
              </Link>
{/* cards list */}
              { events.length === 0 ? (
                <div id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
                  <p className={styles.events__item}>No events available at the moment. Please check back later.</p>
                </div>
              ) : (
                <ul id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
                  { events.map((event, i) => (

                    <li key={i} className={styles.events__item}>
                        <Link href={event.linkHref} className={styles.events__link} target={'_blank'}>
                            <img src={`${event.imgSrc}`} className={styles.img__event_card} alt={event.imgAlt}
                                 width={420} height={180}/>
                            <div className={styles.img__event_title}>{event.title}</div>
                            <div>{event.venue}</div>
                            <div>{event.dates.formatted}</div>

                            {/*<div dangerouslySetInnerHTML={{ __html: event }} />*/}
                        </Link>
                    </li>
                  )).slice(0,3)}
                </ul>
              )}
{/* aside-right */}
            <aside id={styles.aside_events} className={`${styles.aside_box} ${styles.aside_box_events}`}></aside>
        </>)
      }
    </>
  );
};