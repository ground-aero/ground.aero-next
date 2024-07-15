// Sub-component to MAIN // src/components/LayoutMainLibrary.tsx
import React from 'react'
import styles from '../app/page.module.css'
import {intro} from "@/constants"

type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library' | 'sgha2018',
  title: string, 
  text: string,
  // children: React.ReactNode;
};

export const LayoutMainLibrary: React.FC<TLayoutMainProps> = ({ layout, title, text }) => {
  return (
    <>
      
      {layout==='library'? (
        <> 
          <div id={styles.introBoxLeft}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>
          </div>

          <aside id={styles.introBoxRight}>
            Aside blocvk Libraryy
          </aside>
        </>) : ''
      }

      {layout==='sgha2018'? (
        <> 
          <div id={styles.introBoxLeft}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>
          </div>

          <aside id={styles.introBoxRight}>
            Aside block SGHA 2018
          </aside>
        </>) : ''
      }
      
    </>
  );
};