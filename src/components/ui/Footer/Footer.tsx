// src/components/Footer.tsx
import {FC} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/page.module.css'

type TFooter = {
	title?: string
}

export const Footer: FC<TFooter> = ({ title }) => {
	return (
    <footer id={styles.footer} className={styles.footer}>
      <div className={styles.container_spaced}>
        <div className={styles.footer__top}>
          <h4>{title}</h4>

{/* Footer Menu */}
          <ul className={`${styles.nav__list_bottom} ${styles.nav__item_left}`}>
            <li className={styles.nav__item}>
              <Link href='/' className={styles.nav__item_link}>Home</Link>
            </li>
            <li className={styles.nav__item}>
              <Link href='/events' className={styles.nav__item_link}>Events</Link>
            </li>
            <li className={styles.nav__item}>
              <Link href='/sgha2018' className={styles.nav__item_link}>Library</Link>
            </li>
          </ul>
          <ul className={`${styles.nav__list_bottom} ${styles.nav__item_right}`}>
            <li className={`${styles.nav__item} ${styles.nav__item_right}`}>
              <Link href='/contacts' className={styles.nav__item_link}>Contacts</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <p className={styles.footer__par}>© {new Date().getFullYear()} | ground aero</p>
        <p className={styles.footer__img}><Image src="/images/chocks.png" alt="chocks" width={55} height={30}/></p>
      </div>
    </footer>
	)
}
