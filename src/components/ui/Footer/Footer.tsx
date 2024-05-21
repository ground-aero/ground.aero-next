// src/components/Footer.tsx
import {FC} from 'react'
import Link from 'next/link'
import styles from "@/app/page.module.css"

type TFooter = {
	title: string
}

export const Footer: FC<TFooter> = ({ title }) => {
	return (
    <footer className={styles.footer}>
      <div className={styles.container_spaced}>

        <div className={styles.footer_top}>
          <h4>{title}</h4>
          <ul className={styles.navList}> {/* Я добавил предполагаемый класс списку для стилей */}
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/events" className={styles.navLink}>Events</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/library" className={styles.navLink}>Library</Link>
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.footer_bottom}><p>© {new Date().getFullYear()} | ground aero</p></div>
    </footer>
	)
}
