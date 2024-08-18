// HEADER COMPONENT: Header.tsx
'use client'
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import Image from 'next/image'
import { useRouter, usePathname  } from 'next/navigation'
import { Nav } from '@/components'
import Link from 'next/link'

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
              src='/images/1500x5009.jpg' 
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
            src='/images/header_img7.jpg' 
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
