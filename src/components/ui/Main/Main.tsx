// MAIN COMPONENT to sub-components: 1. LayoutMainHome, 2. LayoutMainEvents, 3. LayoutMainLibrary
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import {LayoutMainHome} from "@/components"

type TMain = {
  type: 'home' | 'events' | 'library' | 'sgha' | 'facts' | 'contacts',
  title?: string, 
  text?: string,
  children: React.ReactNode,
}

export const Main: FC<TMain> = ({ type, title, text, children }) => {
	return (
    <>
    {type==='home' ? (
        <main id={styles.grid_main} className={styles.main}>
          {children}
          {/* <LayoutMainHome layout={layout} title={title} text={text} /> */}
        </main>
      ) : ''
    }
    {(type==='library' || type==='sgha') ? (
        <main id={styles.grid_library}>
          {children}
        </main>
      ) : ''
    }
    {type==='events' ? (
        <main id={styles.grid_events}>
          {children}
        </main>
        ) : ''
    }
      {type==='facts' ? (
        <main id={styles.grid_events}>
          {children}
        </main>
      ) : ''
      }
    {type==='contacts' ? (
      <main id={styles.flex_contacts} className={styles.main}>
        {children}
      </main>
    ) : ''
  }
    </>
	)
}