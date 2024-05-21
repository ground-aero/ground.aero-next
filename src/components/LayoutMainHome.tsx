// src/components/LayoutMainHome.tsx
import React from 'react'
import styles from '../app/page.module.css'
import {intro} from "@/constants"

type LayoutMainProps = {
  layout: 'home' | 'events' | 'library',
  title: String, 
  text: String,
  // children: React.ReactNode;
};

export const LayoutMainHome: React.FC<LayoutMainProps> = ({ layout, title, text }) => {
  return (
    <>
      
      {layout==='home'? (
        <> 
          <div className={styles.box_left_main}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>
          </div>

          <aside className={styles.box_aside_main}>
            Aside blocvk Home
          </aside>
        </>) : ''
      }
      
    </>
  );
};