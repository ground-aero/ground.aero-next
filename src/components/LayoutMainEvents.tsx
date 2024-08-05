// Sub-component to MAIN // src/components/LayoutMainEvents.tsx
import React from 'react'
import styles from '../app/page.module.css'
import Image from 'next/image'
import {intro} from "@/constants"

type TLayoutMainProps = {
  type: 'home' | 'events' | 'library',
  // title: string | null, 
  // text: string | null,
  // children: React.ReactNode;
};

export const LayoutMainEvents: React.FC<TLayoutMainProps> = ({ type }) => {
  return (
    <>
      {type==='events' ? (
        <> 
          <div id={styles.boxMain} className={styles.boxContent}>
            {/* <p className={styles.intro_main_title}>{title}</p> */}
            {/* <h1 className={styles.intro_text}>{text}</h1> */}
          </div>

          <aside id={styles.asideBoxRight} className={`${styles.boxAside} ${styles.boxAsideEvents}`}>
            <div className={`${styles.innerEmpty} ${styles.emptyBoxCenter}`}> 
              <h3 className={styles.intro_title}>{'Events'}</h3>
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