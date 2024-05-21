// HEADER COMPONENT: Header.tsx
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import HeaderImg from 'next/image'
import { Nav } from '@/components'
import Link from 'next/link'

type HeaderProps = {
  title: string,
  children: React.ReactNode,
}

export const Header: FC<HeaderProps> = ({ title, children }) => {
	return (
    <header className={styles.header}>

      {children}
      <div className={styles.header_overlay}>
        <HeaderImg className={styles.header_img} src='/images/airport.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
            blurDataURL="/images/airport-blur.jpg" loading="lazy" />
      </div>
      

      <p className={styles.intro_header_title}>{title}</p>

    </header>
	)
}
