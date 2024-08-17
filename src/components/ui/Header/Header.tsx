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
              className={styles.header__img} 
              src='/images/airport_main.jpg' 
              alt="header image" 
              fill 
              placeholder="blur"
              blurDataURL="/images/airport-blur.jpg" 
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />
        <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
      {isActive('/library') ? 
        (<> 
          <Image 
            className={styles.header__img} 
            src='/images/airport_lib.jpg' 
            alt="header image" 
            fill 
            placeholder="blur"
            blurDataURL="/images/airport-blur.jpg" 
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
          <p className={styles.header__intro_title}>{title}</p>
        </>) 
        : isActive('/sgha2018') ? 
        (<> 
          <Image 
            className={styles.header__img} 
            src='/images/airport_lib.jpg' 
            alt="header image" 
            fill 
            placeholder="blur"
            blurDataURL="/images/airport-blur.jpg" 
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
          <p className={styles.header__intro_title}>{title}</p>
        </>)
        : null
      }

      {isActive('/events') ? (
        <> 
          <Image 
            className={styles.header__img} 
            src='/images/airport_events.jpg' 
            alt="header image" 
            fill 
            placeholder="blur"
            blurDataURL="/images/airport-blur.jpg" 
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
          <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
      {isActive('/contacts') ? (
        <> 
          <Image 
              className={styles.header__img} 
              src='/images/airport_main.jpg' 
              alt="header image" 
              fill 
              placeholder="blur"
              blurDataURL="/images/airport-blur.jpg" 
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />
          <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
      </div>
    </header>
	)
}
