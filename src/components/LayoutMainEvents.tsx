// Sub-component to MAIN // src/components/LayoutMainEvents.tsx
import React from 'react'
import styles from '../app/page.module.css'
import {intro} from "@/constants"

type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library',
  title: string, 
  text: string,
  // children: React.ReactNode;
};

export const LayoutMainEvents: React.FC<TLayoutMainProps> = ({ layout, title, text }) => {
  return (
    <>
      
      {layout==='events'? (
        <> 
          <div id={styles.introBoxLeft}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>
          </div>

          <aside id={styles.introBoxRight}>
            Aside blocvk Events
          </aside>
        </>) : ''
      }
      
    </>
  );
};