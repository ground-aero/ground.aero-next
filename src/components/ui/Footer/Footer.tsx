// src/components/Footer.tsx
import React from 'react'
import Link from 'next/link'
import styles from "@/app/page.module.css"

type IFooter = {
	title: string
}

export const Footer: React.FC<IFooter> = ({ title }) => {
	return (
    <footer className={styles.footer}>

      <div className={styles.footer_upperSection}>
        <h4>{title}</h4>
        <ul className={styles.navList}> {/* Я добавил предполагаемый класс списку для стилей */}
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink }>Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/events" className={styles.navLink}>Events</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/library" className={styles.navLink}>Library</Link>
          </li>
        </ul>
      </div>

      <div className={styles.footer_bottomSection}><p>© {new Date().getFullYear()} | ground aero</p></div>   

    </footer>
	)
}
