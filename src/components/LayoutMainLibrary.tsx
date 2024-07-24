// Sub-component to MAIN // src/components/LayoutMainLibrary.tsx
import React from 'react'
import styles from '../app/page.module.css'
import {intro} from "@/constants"

type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library',
  title: string, 
  text: string,
  // children: React.ReactNode;
};

export const LayoutMainLibrary: React.FC<TLayoutMainProps> = ({ layout, title, text }) => {
  return (
    <>
      {layout==='library'? (
        <> 
          <div id={styles.boxMain}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>
          </div>

          <aside id={styles.asideBoxRight} className={styles.boxAside}>
            Aside block Libraryy
          </aside>
        </>) : ''
      }
    </>
  );
};