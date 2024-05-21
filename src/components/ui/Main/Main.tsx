import {FC} from 'react'
import styles from "@/app/page.module.css"

type IMain = {
  title: String, 
  text: String,
}

export const Main: FC<IMain> = ({ title, text }) => {
	return (
    <main className={styles.main}>
      <div className={styles.container_centered}>

        <div className={styles.box_left_main}>
          <p className={styles.intro_main_title}>{title}</p>
          <h1 className={styles.intro_text}>{text}</h1>
        </div>

        <aside className={styles.box_aside_main}>
          Aside blocvk
        </aside>
        
      </div>
    </main>
	)
}