// Sub-component to <main> at HomePage // src/components/LayoutMainHome.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../app/page.module.css'
import {intro} from "@/constants"
// import img__facts from 'next/image'

// type TtextFacts = {
//   factOne: string, factTwo: string, factThree: string,
// }
type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library',
  title: string, 
  text: string,
  titleFacts: string,
  textFacts: {factOne: string, factTwo: string, factThree: string,},
  titlePublications: string,
  titleEvents: string,
  events: {id: number, title: string, body: string}[],
  // children: React.ReactNode;
};

export const LayoutMainHome: React.FC<TLayoutMainProps> = ({ layout, title, text, titleFacts, titlePublications, textFacts, titleEvents, events }) => {
  return (
    <>
      {layout==='home'? (
        <> 
{/* INTRO Section ----------------------------------------------*/}
{/* center */}
          <div id={styles.intro__box_center} className={`${styles.intro__box_center} ${styles.box__content} ${styles.box__content_main}`}>
            <div className={styles.box__content_center}>
              <span className={styles.decor_bar}></span>
              <p className={`${styles.intro_title} ${styles.intro_title__small} ${styles.intro_title__left}`}>{title}</p>
            </div>
            <h3 className={styles.intro__text}>{text}</h3>
          </div>

{/* left */}
          <div id={styles.intro__box_left} className={`${styles.aside_box}`}>
            <Link href="#" className={`${styles.card} ${styles.empty__box_center} ${styles.empty__box_left}`} target="_self" rel="noopener noreferrer">
              <div className={`${styles.empty__inner} ${styles.empty__inner_reverse}`}>
                  <Image
                    src="/images/facts_n_figures.png" alt="facts & figures" width={28} height={28} className={styles.img__responsive_square}
                  />
                  <h3 className={styles.intro_title}>{titleFacts}</h3>
              </div>
            </Link>
            
            <ul className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
              <li className={`${styles.intro__text} ${styles.intro__text_left}`}>{textFacts.factOne}</li>
              <li className={`${styles.intro__text} ${styles.intro__text_left}`}>{textFacts.factTwo}</li>
              <li className={`${styles.intro__text} ${styles.intro__text_left}`}>{textFacts.factThree}</li>
              <li></li>
            </ul>
          </div>

{/* right */}
          <aside id={styles.introBoxRight} className={`${styles.aside_box} ${styles.borderLeft}`}>

            <Link href="/sgha2018" className={`${styles.card} ${styles.empty__box_center} ${styles.empty__box_right}`} target="_self" rel="noopener noreferrer">
              <div className={styles.empty__inner}> 
                <h3 className={styles.intro_title}>{titlePublications}</h3>
                <Image
                    src="/images/arrows2.png" alt="arrows" width={28} height={28} className={`${styles.img__facts} ${styles.img__responsive_square}`}
                  />                      
              </div>
            </Link>

            <div className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
              <h2 className={`${styles.intro_title__small} ${styles.intro_title} ${styles.intro_title_right}`}>SGHA2018</h2>
            </div>
            
          </aside>

{/* EVENTS Section -----------------------------------------------------*/}

{/* header banner */}
            <div id={styles.banner_header} className={`${styles.empty__box_center} ${styles.empty__box_right} ${styles.emptyBox}`}>

              <div className={styles.empty__inner}> 
                <h3 className={`${styles.intro_title} ${styles.intro_title_large}`}>{titleEvents}</h3>
                <Image
                    src="/images/arrows2.png" alt="arrows" width={28} height={28} className={styles.img__responsive_square}
                  />                      
              </div>
            </div>

{/* cards list */}
            <ul id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
              
              {events && events.map((event) => (
                <li key={event.id} className={styles.events__item}>
                  <div>IMG</div>
                  <p className={styles.events__item_text}>{`Заголовок: ${event.title}`}</p>
                  <p className={styles.events__item_text}>{`Тело: ${event.body}`}</p>
                </li>
              )).slice(0,3)}
            </ul>

{/* aside-right */}
            <aside id={styles.aside_events} className={`${styles.aside_box} ${styles.aside_box__events}`}></aside>

        </>) : ''
      }
    </>
  );
};