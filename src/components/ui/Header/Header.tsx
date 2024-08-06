// HEADER COMPONENT: Header.tsx
'use client'
import React, {FC} from 'react'
import styles from "@/app/page.module.css"
import HeaderImg from 'next/image'
import { useRouter, usePathname  } from 'next/navigation'
import { Nav } from '@/components'
import Link from 'next/link'

type THeader = {
  type?: 'home' | 'library' | 'events',
  title: string,
  // children: React.ReactNode,
}

export const Header: FC<THeader> = ({ type, title }) => {
  const pathname = usePathname();
   // func to define active menu item
  const isActive = (path: string) => pathname === path;

	return (
    <header id={styles.header} className={styles.header}>

      {/* {children} */}

      <div className={styles.header__overlay}>

      {isActive('/') ? (
        <> 
          <HeaderImg className={styles.header__img} src='/images/airport_main.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
            blurDataURL="/images/airport-blur.jpg" loading="lazy" />
        
        <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }

      {isActive('/library') ? 
        (<> 
          <HeaderImg className={styles.header__img} src='/images/airport_lib.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
              blurDataURL="/images/airport-blur.jpg" loading="lazy" />
          
          <p className={styles.header__intro_title}>{title}</p>
        </>) 
        : isActive('/sgha2018') ? 
        (<> 
          <HeaderImg className={styles.header__img} src='/images/airport_lib.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
              blurDataURL="/images/airport-blur.jpg" loading="lazy" />
          
          <p className={styles.header__intro_title}>{title}</p>
        </>)
        : null
      }

      {isActive('/events') ? (
        <> 
          <HeaderImg className={styles.header__img} src='/images/airport_events.jpg' alt="header image" layout='responsive' width='1433' height='240' placeholder="blur"
              blurDataURL="/images/airport-blur.jpg" loading="lazy" />
          
          <p className={styles.header__intro_title}>{title}</p>
        </>) : ''
      }
        

      </div>

    </header>
	)
}
