// HEADER COMPONENT: Header.tsx
'use client'
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import Image from 'next/image'
import { useRouter, usePathname  } from 'next/navigation'

type THeader = {
  type?: 'home' | 'library' | 'events' | 'contacts',
  title: string,
  // children: React.ReactNode,
}

export const Header: FC<THeader> = ({ type, title }) => {
  const pathname = usePathname();
   // func to define active menu item
  const isActive = (path: string) => pathname === path;

	return (
    <header id={styles.header} className={styles.header}>
      <div className={styles.header__overlay}>

      {isActive('/') ? (
        <> 
          <Image 
            src='/images/header_home_mob.webp' 
            alt="header image" 
            fill 
            placeholder="blur"
            blurDataURL="/images/header_home_mob_blur.webp" 
            loading="lazy"
            className={`${styles.header__img} ${styles.mobile}`}
            sizes="(max-width: 767px) 100vw, 740px"
          />
          <Image 
            src='/images/header_home.webp'
            alt="header image"
            fill
            placeholder="blur"
            blurDataURL="/images/header_home_blur.webp"
            loading="lazy"
            className={`${styles.header__img} ${styles.desktop}`}
            sizes="(min-width: 768px) 100vw, 1700px"
            />
          <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
      {isActive('/library') ? 
        (<> 
          <Image 
            src='/images/header_img88.jpg' 
            alt="header image" 
            fill 
            placeholder="blur"
            blurDataURL="/images/airport-blur.jpg" 
            loading="lazy"
            style={{ objectFit: 'cover' }}
            className={styles.header__img}
          />
          <p className={styles.header__intro_title}>{title}</p>
        </>) 
        : isActive('/sgha2018') ? 
        (<> 
          <Image 
            src='/images/header_img88.jpg' 
            alt="header image" 
            fill 
            placeholder="blur"
            blurDataURL="/images/airport-blur.jpg" 
            loading="lazy"
            style={{ objectFit: 'cover' }}
            className={styles.header__img}
          />
          <p className={styles.header__intro_title}>{title}</p>
        </>)
        : null
      }

      {isActive('/events') ? (
        <> 
          <Image 
            src='/images/header_events_mob.webp'
            alt="header image"
            fill
            placeholder="blur"
            blurDataURL="/images/header_events_mob_blur.webp"
            loading="lazy"
            className={`${styles.header__img} ${styles.mobile}`}
            sizes="(max-width: 767px) 100vw, 450px"
          />
          <Image 
              src='/images/header_events_main.webp'
              alt="header image"
              fill
              placeholder="blur"
              blurDataURL="/images/header_events_main_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.desktop}`}
              sizes="(min-width: 768px) 100vw, 1680px"
            />
          <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
      {isActive('/contacts') ? (
        <> 
          <Image 
              src='/images/header_contacts5.jpg' 
              alt="header image" 
              fill 
              placeholder="blur"
              blurDataURL="/images/airport-blur.jpg" 
              loading="lazy"
              style={{ objectFit: 'cover' }}
              className={styles.header__img}
            />
          <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
      </div>
    </header>
	)
}
