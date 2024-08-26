// Nav.tsx - subcomponent of HEADER
// src/components/Nav.tsx
'use client'
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname  } from 'next/navigation'
import styles from "@/app/page.module.css"

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleBurger = () => {
    setIsOpen(!isOpen);
  };

 // func to define active menu item
 const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.nav}>
      <div className={styles.container_spaced}>

        <Link href="/">
          <Image
            src="/images/logo_ground.webp"
            alt="Home"
            width={217}
            height={80}
            className={styles.logoResponsiveImg}
          />
        </Link>

{/* Inline Menu > 768px */}
        <ul className={styles.nav__list_top}>
          <li className={`${styles.nav__item} ${isActive('/') ? styles.Active : ''}`}>
            <Link href="/" className={styles.nav__item_link}>HOME</Link>
          </li>
          <li className={`${styles.nav__item} ${isActive('/events') ? styles.Active : ''}`}>
            <Link href="/events" className={styles.nav__item_link}>EVENTS</Link>
         </li>
          <li className={`${styles.nav__item} ${isActive('/sgha2018') ? styles.Active : ''}`}>
            <Link href="/sgha2018" className={styles.nav__item_link}>LIBRARY</Link>
          </li>
        </ul>

{/* Burger Menu < 768px */}
        <button className={styles.burger_button} onClick={toggleBurger}>
          <span className={styles.burger__icon}></span>
        </button>
        <ul className={`${styles.nav__list_type_burger} ${isOpen ? styles.open : ''}`}>
          <li className={styles.nav__item}>
            <Link href="/" onClick={toggleBurger} className={`${styles.nav__item_link} ${isActive('/') ? styles.active__burger : ''}`}>Home</Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/events" onClick={toggleBurger} className={`${styles.nav__item_link} ${isActive('/events') ? styles.active__burger : ''}`}>Events</Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/sgha2018" onClick={toggleBurger} className={`${styles.nav__item_link} ${isActive('/sgha2018') ? styles.active__burger : ''}`}>Library</Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/contacts" onClick={toggleBurger} className={`${styles.nav__item_link} ${isActive('/contacts') ? styles.active__burger : ''}`}>Contacts</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};
