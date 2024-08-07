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

        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${isActive('/') ? styles.Active : ''}`}>
            <Link href="/" className={styles.navLink}>HOME</Link>
          </li>
          <li className={`${styles.navItem} ${isActive('/events') ? styles.Active : ''}`}>
            <Link href="/events" className={styles.navLink}>EVENTS</Link>
         </li>
          <li className={`${styles.navItem} ${isActive('/sgha2018') ? styles.Active : ''}`}>
            <Link href="/sgha2018" className={styles.navLink}>LIBRARY</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};
