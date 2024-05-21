// Sub-component to MAIN // src/components/LayoutMainHome.tsx
import React from 'react'
import Link from 'next/link'
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
          <div id={styles.mainLeft} className={styles.box_left_main}>
            <p className={styles.intro_main_title}>{title}</p>
            <h1 className={styles.intro_text}>{text}</h1>
          </div>

          <aside id={styles.asideRight} className={styles.box_aside_main}>
            Aside blocvk Home
          </aside>


          {/* <div className={styles.grid}>

            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                1/ Docs <span>-&gt;</span>
              </h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                2/Learn <span>-&gt;</span>
              </h2>
              <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
            </a>

            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                3/ Templates <span>-&gt;</span>
              </h2>
              <p>Explore starter templates for Next.js.</p>
            </a>

            <Link
              href="/library"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                4. MY LIBRARY <span>-&gt;</span>
              </h2>
              <p>
                Link to my ground,.aero Library
              </p>
            </Link>
        </div> */}








        </>) : ''

      }
      
    </>
  );
};