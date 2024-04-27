// src/components/Nav.tsx
import Link from 'next/link'
import React from 'react'
import styles from '@/app/page.module.css'

export const Nav: React.FC = () => {
    return (
      <nav className={styles.navMenu}>
      <ul className={styles.navList}> {/* Я добавил предполагаемый класс списку для стилей */}
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>HOME</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/events" className={styles.navLink}>EVENTS</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/library" className={styles.navLink}>LIBRARY</Link>
        </li>
      </ul>
    </nav>
    );
  };
