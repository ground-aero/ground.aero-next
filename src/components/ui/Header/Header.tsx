import {FC} from 'react'
import styles from "@/app/page.module.css"
import HeaderImg from 'next/image'
import {Nav} from '@/components'

type IHeader = {
  title: string, 
}

export const Header: FC<IHeader> = ({ title }) => {
	return (
    <header className={styles.header}>

      <Nav />

<span className={styles.header_overlay}>
  <HeaderImg className={styles.header_img} src='/images/airport.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
       blurDataURL="/images/airport-blur.jpg" loading="lazy" />
</span>
      

      <p className={styles.intro_header_title}>{title}</p>

    </header>
	)
}
