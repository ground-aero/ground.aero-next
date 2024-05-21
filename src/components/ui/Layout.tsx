// src/components/Layout.tsx
import React from 'react'
import styles from '../../app/page.module.css'
import { Header } from '@/components'
import { Main } from '@/components'
import { Footer } from '@/components'
import {intro} from "@/constants"

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header title={intro.library.slogan}>{children}</Header>

      
      {/* <main className={styles.main}>
        {children}
      </main> */}
      <Main layout={''} title='Title in HOME' text='Text in HOME'>
        {/* {children} */}
      </Main>

      <Footer title='FOOTER IN LAYOUT // Title NAME' />
    </>
  );
};