// MAIN COMPONENT to sub-components: 1. LayoutMainHome, 2. LayoutMainEvents, 3. LayoutMainLibrary
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import {LayoutMainHome} from "@/components"

type IMain = {
  title: String, 
  text: String,
  children: React.ReactNode,
}

export const Main: FC<IMain> = ({ title, text, children }) => {
	return (
    <main id={styles.idMain} className={styles.main}>
      {/* <div className={styles.container_centered}> */}

        {children}

        {/* <LayoutMainHome layout={layout} title={title} text={text} /> */}
        
      {/* </div> */}
    </main>
	)
}