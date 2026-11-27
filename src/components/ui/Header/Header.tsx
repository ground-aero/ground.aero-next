'use client'

import React, { FC } from 'react'
import styles from '@/app/page.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type THeader = {
  type?: 'home' | 'library' | 'events' | 'facts' | 'contacts' | 'not-found'
  title: string
}

export const Header: FC<THeader> = ({ type = 'home', title }) => {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const isHome = type === 'home' || isActive('/')

  const isEvents = type === 'events' || isActive('/events')

  const isFacts =
    type === 'facts' || isActive('/facts-and-figures')

  const isLibrary =
    type === 'library' ||
    isActive('/library') ||
    isActive('/sgha2018') ||
    isActive('/sgha2013')

  const isContacts = type === 'contacts' || isActive('/contacts')

  return (
    <header id={styles.header} className={styles.header}>
      <div className={styles.header__overlay}>
        {isHome && (
          <>
            <Image
              src="/images/header_home_mob.webp"
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
              src="/images/header_home.webp"
              alt="airport"
              fill
              placeholder="blur"
              blurDataURL="/images/header_home_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.desktop}`}
              sizes="(min-width: 768px) 100vw, 1700px"
            />

            <p className={styles.header__intro_title}>{title}</p>
          </>
        )}

        {isEvents && (
          <>
            <Image
              src="/images/header_events_mob.webp"
              alt="cities"
              fill
              placeholder="blur"
              blurDataURL="/images/header_events_mob_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.mobile}`}
              sizes="(max-width: 767px) 100vw, 740px"
            />

            <Image
              src="/images/header_events.webp"
              alt="cities"
              fill
              placeholder="blur"
              blurDataURL="/images/header_events_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.desktop}`}
              sizes="(min-width: 768px) 100vw, 1700px"
            />

            <p className={styles.header__intro_title}>{title}</p>
          </>
        )}

        {isFacts && (
          <>
            <Image
              src='/images/header_facts_mob.webp'
              alt="facts and figures"
              fill
              placeholder="blur"
              blurDataURL="/images/header_facts_mob_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.mobile}`}
              sizes="(max-width: 767px) 100vw, 740px"
            />
            <Image
              src='/images/header_facts.webp'
              alt="facts and figures"
              fill
              placeholder="blur"
              blurDataURL="/images/header_facts_blur.webp"
              loading="lazy"
              className={`${styles.header__img} ${styles.desktop}`}
              sizes="(min-width: 768px) 100vw, 1700px"
            />
            <p className={styles.header__intro_title}>{title}</p>
          </>
        )} 

        {isLibrary && (
          <>
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
          </>
        )} 

        {isContacts && (
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
          </>
        )} 

      </div>
    </header>
  )
}