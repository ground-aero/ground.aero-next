// MAIN COMPONENT to sub-components: 1. LayoutMainHome, 2. LayoutMainEvents, 3. LayoutMainLibrary
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import {LayoutMainHome} from "@/components"

type TMain = {
  type: 'home' | 'events' | 'library',
  title?: string, 
  text?: string,
  children: React.ReactNode,
}

export const Main: FC<TMain> = ({ type, title, text, children }) => {
	return (
    <>
    {type==='home' ? (
      
        <main id={styles.gridMain} className={styles.main}>
          {children}
          {/* <LayoutMainHome layout={layout} title={title} text={text} /> */}
        </main>
      ) : ''
    }  

    {type==='library' ? (
        <main id={styles.gridLibrary}>
          {children}
        </main>
      ) : ''
    }

    {type==='events' ? (
        <main id={styles.gridEvents}>
          {children}
        </main>
        ) : ''
      }
    </>
	)
}