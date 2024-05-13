// src/components/Nav.tsx
import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";

export const Nav: FC = () => {
  return (
    <nav className={styles.navMenu}>
      <div className={styles.container}>

        <Link href="/">
          <Image
            src="/images/groundaero_logoline12.png"
            alt="Home"
            width={315}
            height={40}
            loading="eager"
          />
        </Link>

        <ul className={styles.navList}>
          {" "}
          {/* Я добавил предполагаемый класс списку для стилей */}
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              HOME
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/events" className={styles.navLink}>
              EVENTS
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/library" className={styles.navLink}>
              LIBRARY
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};
