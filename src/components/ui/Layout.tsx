// src/components/Layout.tsx
import React from 'react'
import { Header, Footer } from '@/components'

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header title='Header Title'></Header>
      <main>{children}</main>
      <Footer title='FOOTER IN LAYOUT // Title NAME' />
    </>
  );
};