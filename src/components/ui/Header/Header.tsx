import styles from "@/app/page.module.css"
import HeaderImg from 'next/image'
import {Nav} from '@/components'

interface IHeader {
	title: String,
}

export function Header({ title }: IHeader) {
	return (
    <header className={styles.header}>

      <Nav />

      <HeaderImg src='/images/airport.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
       blurDataURL="/images/airport-blur.jpg" loading="eager" />
      <h2>{title}</h2>
    </header>
	)
}
