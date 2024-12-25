// HEADER COMPONENT: Header.tsx
'use client'
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import Image from 'next/image'
import { usePathname  } from 'next/navigation'

type THeader = {
  type?: 'home' | 'library' | 'events' | 'contacts',
  title: string,
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
            alt="airport" 
            width={740}
            height={285}
            placeholder="blur"
            blurDataURL="/images/header_home_mob_blur.webp" 
            loading="lazy"
            className={`${styles.header__img} ${styles.mobile}`}
            sizes="(max-width: 767px) 100vw, 740px"
          />
          <Image 
            src='/images/header_home.webp'
            alt="airport"
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
      {isActive('/events') ? (
        <> 
          <Image 
            src='/images/header_events_mob.webp'
            alt="cities"
            fill
            placeholder="blur"
            blurDataURL="/images/header_events_mob_blur.webp"
            loading="lazy"
            className={`${styles.header__img} ${styles.mobile}`}
            sizes="(max-width: 767px) 100vw, 740px"
          />
          <Image 
              src='/images/header_events.webp'
              alt="cities"
              fill
              placeholder="blur"
              blurDataURL="/images/header_events_blur.webp"
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
            src='/images/header_library_mob.webp'
            alt="airport apron"
            fill
            placeholder="blur"
            blurDataURL="/images/header_library_mob_blur.webp"
            loading="lazy"
            className={`${styles.header__img} ${styles.mobile}`}
            sizes="(max-width: 767px) 100vw, 740px"
          />
          <Image 
              src='/images/header_library.webp'
              alt="airport apron"
              fill
              placeholder="blur"
              blurDataURL="/images/header_library_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.desktop}`}
              sizes="(min-width: 768px) 100vw, 1700px"
            />
          <p className={styles.header__intro_title}>{title}</p>
        </>) 
        : isActive('/sgha2018') ? 
        (<> 
          <Image 
            src='/images/header_library_mob.webp'
            alt="airport apron"
            fill
            placeholder="blur"
            blurDataURL="/images/header_library_mob_blur.webp"
            loading="lazy"
            className={`${styles.header__img} ${styles.mobile}`}
            sizes="(max-width: 767px) 100vw, 740px"
          />
          <Image 
              src='/images/header_library.webp'
              alt="airport apron"
              fill
              placeholder="blur"
              blurDataURL="/images/header_library_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.desktop}`}
              sizes="(min-width: 768px) 100vw, 1700px"
            />
          <p className={styles.header__intro_title}>{title}</p>
        </>)
        : null
      }
      {isActive('/contacts') ? (
        <>
        <Image 
            src='/images/header_contacts_mob.webp'
            alt="airport apron sunset"
            fill
            placeholder="blur"
            blurDataURL="/images/header_contacts_mob_blur.webp"
            loading="lazy"
            className={`${styles.header__img} ${styles.mobile}`}
            sizes="(max-width: 767px) 100vw, 740px"
          />
          <Image 
              src='/images/header_contacts.webp'
              alt="airport apron sunset"
              fill
              placeholder="blur"
              blurDataURL="/images/header_contacts_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.desktop}`}
              sizes="(min-width: 768px) 100vw, 1700px"
            />
          <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
      </div>
    </header>
	)
}
