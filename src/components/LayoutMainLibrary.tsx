// Sub-component to MAIN // src/components/LayoutMainLibrary.tsx
import React from 'react'
import styles from '../app/page.module.css'
import {intro} from "@/constants"

type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library' | 'sgha',
  title: string, 
  text: string,
  // children: React.ReactNode;
};

export const LayoutMainLibrary: React.FC<TLayoutMainProps> = ({ layout, title, text }) => {
  return (
    <>
      {layout==='library'? (
        <> 
          <div id={styles.main_box} className={styles.box__content}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro__text}>{text}</h1>
          </div>

          <aside id={styles.aside_box} className={styles.aside_box}>
            Aside block Libraryy
          </aside>
        </>) : ''
      }
    </>
  );
};