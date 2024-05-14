import {FC} from 'react'
import styles from "@/app/page.module.css"
import HeaderImg from 'next/image'
import {Nav} from '@/components'

type IMain = {
  title: String, 
  text: String,
}

export const Main: FC<IMain> = ({ title, text }) => {
	return (
    <main className={styles.main}>

      {/* <Nav /> */}

      <p className={styles.intro_main_title}>{title}</p>
      <h1 className={styles.intro_text}>{text}</h1>

    </main>
	)
}