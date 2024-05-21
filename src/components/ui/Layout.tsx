// src/components/Layout.tsx
import React from 'react'
import styles from '../../app/page.module.css'
import { Header } from '@/components'
import { Main } from '@/components'
import { Footer } from '@/components'


type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header title='HEADER IN LAYOUT // Title NAME' />

      
      {/* <main className={styles.main}>
        {children}
      </main> */}
      <Main title='Title in HOME' text='Text in HOME'>
        {/* {children} */}
      </Main>

      <Footer title='FOOTER IN LAYOUT // Title NAME' />
    </>
  );
};