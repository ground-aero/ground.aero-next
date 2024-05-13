// src/components/Layout.tsx
import React from 'react'
import styles from '../../app/page.module.css'
import { Footer } from '@/components'
import { Header } from '@/components'

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header title='HEADER IN LAYOUT // Title NAME' text='Header text in Layout' />
      <main className={styles.main}>
        {children}
      </main>
      <Footer title='FOOTER IN LAYOUT // Title NAME' />
    </>
  );
};