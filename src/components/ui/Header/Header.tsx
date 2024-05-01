import {FC} from 'react'
import styles from "@/app/page.module.css"
import HeaderImg from 'next/image'
import {Nav} from '@/components'

type IHeader = {
  title: String, 
  text: String,
}

export const Header: FC<IHeader> = ({ title, text }) => {
	return (
    <header className={styles.header}>

      <Nav />

      <HeaderImg src='/images/airport.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
       blurDataURL="/images/airport-blur.jpg" loading="eager" />

      <p className={styles.intro_title}>{title}</p>
      <h1 className={styles.intro_text}>{text}</h1>

    </header>
	)
}
