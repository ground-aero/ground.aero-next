// src/components/Layout.tsx
import React from 'react'
import styles from '../../app/page.module.css'
import { Footer } from '@/components'

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
      <Footer title='FOOTER IN LAYOUT // Title NAME' />
    </>
  );
};