// Sub-component to MAIN // src/components/LayoutMainSgha.tsx
import React from 'react'
import styles from '../app/page.module.css'
import Image from 'next/image'
import {intro} from "@/constants"

type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library' | 'sgha',
  title: string,
  subtitleBold: string,
  subtitleNormal: string,
  text: string,
  // children: React.ReactNode;
};

export const LayoutMainSgha: React.FC<TLayoutMainProps> = ({ layout, title, subtitleBold, subtitleNormal, text }) => {
  return (
    <>
      {layout==='sgha' ? (
        <> 
          <div id={styles.boxMain} className={styles.boxContent}>

            {/* <div className={styles.horizontalBar}>
              <span className={styles.horizontalBar__span}></span>
            </div> */}

            <div className={`${styles.emptyBoxCenter}`} >
              <span className={`${styles.decorBar} ${styles.decorBarLarge}`}></span>
              <h1 className={styles.intro_main_title}>{intro.library.sgha2018.title}</h1>
            </div>
            <h2 className={styles.intro_main_subtitle}>{intro.library.sgha2018.subtitleBold}</h2>
            <h3 className={styles.intro_main_subtitle_secondary}>{intro.library.sgha2018.subtitleNormal}</h3>
            {/* <p className={styles.intro_text}>{text}</p> */}

          </div>

          <aside id={styles.asideBoxRight} className={styles.boxAside}>
            <div className={`${styles.innerEmpty} ${styles.emptyBoxCenter}`}> 
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