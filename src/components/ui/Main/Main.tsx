// MAIN COMPONENT to sub-components: 1. LayoutMainHome, 2. LayoutMainEvents, 3. LayoutMainLibrary
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import {LayoutMainHome} from "@/components"

type TMain = {
  title?: string, 
  text?: string,
  children: React.ReactNode,
}

export const Main: FC<TMain> = ({ title, text, children }) => {
	return (
    
    // grid Layout Main
    <main id={styles.gridMain} className={styles.main}>
      {/* <div className={styles.container_centered}> */}

        {children}

        {/* <LayoutMainHome layout={layout} title={title} text={text} /> */}
        
      {/* </div> */}
    </main>
	)
}