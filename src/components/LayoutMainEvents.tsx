// Sub-component to MAIN // src/components/LayoutMainEvents.tsx
import React from 'react'
import styles from '../app/page.module.css'
import {intro} from "@/constants"

type TLayoutMainProps = {
  type: 'home' | 'events' | 'library',
  title: string, 
  text: string,
  // children: React.ReactNode;
};

export const LayoutMainEvents: React.FC<TLayoutMainProps> = ({ type, title, text }) => {
  return (
    <>
      {type==='events' ? (
        <> 
          <div id={styles.boxMain}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>
          </div>

          <aside id={styles.asideBoxRight} className={styles.boxAside}>
            Aside blocvk Events
          </aside>
        </>) : ''
      }
    </>
  );
};