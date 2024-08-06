// Nav.tsx - subcomponent of HEADER
// src/components/Nav.tsx
'use client'
import React, { FC } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname  } from 'next/navigation'
import styles from "@/app/page.module.css"

// type NavProps = {
//   active: 'HOME' | 'EVENTS' | 'LIBRARY';
// };

export const Nav = () => {
  const pathname = usePathname();
const router = useRouter();

 // func to define active menu item
 const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.navMenu}>
      <div className={styles.container_spaced}>

        <Link href="/">
          <Image
            src="/images/groundaero_logoline12.png"
            alt="Home"
            width={240}
            height={32}
            className={styles.logoResponsiveImg}
          />
        </Link>

        <ul className={`${styles.nav} ${styles.nav_list} ${styles.nav_list__top}`}>
          <li className={`${styles.nav__item} ${isActive('/') ? styles.Active : ''}`}>
            <Link href="/" className={styles.nav__link}>HOME</Link>
          </li>
          <li className={`${styles.nav__item} ${isActive('/events') ? styles.Active : ''}`}>
            <Link href="/events" className={styles.nav__link}>EVENTS</Link>
         </li>
          <li className={`${styles.nav__item} ${isActive('/sgha2018') ? styles.Active : ''}`}>
            <Link href="/sgha2018" className={styles.nav__link}>LIBRARY</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};
