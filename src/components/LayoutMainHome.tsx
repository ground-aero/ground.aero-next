// Sub-component to <main> at HomePage // src/components/LayoutMainHome.tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../app/page.module.css'
import {intro} from "@/constants"
// import imgFacts from 'next/image'

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
{/* left */}
          <div id={styles.introBoxLeft} className={styles.boxAside}>
            <Link href="#" className={`${styles.card} ${styles.emptyBoxRight}`} target="_self" rel="noopener noreferrer">
              <div className={styles.innerEmpty}>
                  <Image
                    src="/images/facts_n_figures.png" alt="facts & figures" width={28} height={28}
                  />
                  <h3 className={styles.intro_title}>{titleFacts}</h3>
              </div>
            </Link>
            
            <ul className={styles.intro_list}>
              <li className={`${styles.intro_text} ${styles.intro_text_left}`}>{textFacts.factOne}</li>
              <li className={`${styles.intro_text} ${styles.intro_text_left}`}>{textFacts.factTwo}</li>
              <li className={`${styles.intro_text} ${styles.intro_text_left}`}>{textFacts.factThree}</li>
              <li></li>
            </ul>
          </div>

{/* center */}
          <div id={styles.introBoxCenter} className={styles.introBoxCenter}>
            <div className={styles.emptyBoxCenter}>
              <span className={styles.decorBar}></span>
              <p className={`${styles.intro_title} ${styles.intro_title_left}`}>{title}</p>
            </div>
            <h3 className={styles.intro_text}>{text}</h3>
          </div>

{/* right */}
          <aside id={styles.introBoxRight} className={styles.boxAside}>

            <Link href="/sgha2018" className={`${styles.card} ${styles.emptyBoxRight}`} target="_self" rel="noopener noreferrer">
              <div className={styles.innerEmpty}> 
                <h3 className={styles.intro_title}>{titlePublications}</h3>
                <Image
                    src="/images/arrows2.png" className={styles.imgFacts} alt="arrows" width={28} height={28}
                  />                      
              </div>
            </Link>

            <div className={styles.intro_list}>
              <h2 className={`${styles.intro_title} ${styles.intro_title_right}`}>SGHA2018</h2>

            </div>
          </aside>

{/* EVENTS Section -----------------------------------------------------*/}

{/* header banner */}
            <div id={styles.bannerHeader} className={styles.emptyBox}>

              <div className={styles.innerEmpty}> 
                <h3 className={`${styles.intro_title} ${styles.intro_title_large}`}>{titleEvents}</h3>
                <Image
                    src="/images/arrows2.png" className={styles.imgFacts} alt="arrows" width={28} height={28}
                  />                      
              </div>
            </div>

{/* cards list */}
            <ul id={styles.eventsList} className={styles.eventsList}>
              
              {events && events.map((event) => (
                <li key={event.id} className={styles.eventsItem}>
                  <div>IMG</div>
                  <p className={styles.eventsItemText}>{`Заголовок: ${event.title}`}</p>
                  <p className={styles.eventsItemText}>{`Тело: ${event.body}`}</p>
                </li>
              )).slice(0,3)}
            </ul>

{/* aside-right */}
            <div id={styles.eventsBoxRight} className={`${styles.boxAside} ${styles.boxAsideEvents}`}></div>

        </>) : ''
      }
    </>
  );
};