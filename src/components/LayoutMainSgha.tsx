// Sub-component to MAIN // src/components/LayoutMainSgha.tsx
import React from 'react'
import styles from '../app/page.module.css'
import Image from 'next/image'
import {intro} from "@/constants"

type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library' | 'sgha',
  title: string, 
  text: string,
  // children: React.ReactNode;
};

export const LayoutMainSgha: React.FC<TLayoutMainProps> = ({ layout, title, text }) => {
  return (
    <>
      {layout==='sgha' ? (
        <> 
          <div id={styles.boxMain} className={styles.boxMain}>

            {/* <div className={styles.horizontalBar}>
              <span className={styles.horizontalBar__span}></span>
            </div> */}

            <div className={styles.emptyBoxCenter}>
              <span className={styles.decorBar}></span>
              <p className={`${styles.intro_title} ${styles.intro_title_left}`}>{title}</p>
            </div>

            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>

          </div>

          <aside id={styles.asideBoxRight} className={styles.boxAside}>
            <div className={styles.innerEmpty}> 
              <h3 className={styles.intro_title}>{'Publications'}</h3>
              <Image
                  src="/images/arrows2.png" className={styles.imgFacts} alt="arrows" width={22} height={22}
              />                      
            </div>
          </aside>
        </>) : ''
      }
    </>
  );
};