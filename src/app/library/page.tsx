// LIBRARY - HOME PAGE. отвеч.за серверную часть
import React, {FC} from 'react'
import type { Metadata } from "next"
import { Header, Nav, Main, LayoutMainLibrary } from "@/components"
import {intro} from '@/constants'

export const metadata: Metadata = {
  title: "sgha 2018 IATA, sgha 2013 IATA, Library",
  description: "Directory. 1. SGHA 2018 IATA, 2. SGHA 2013 IATA, 3. Ground Handling Vocab",
};

type PageProps = {
  children: React.ReactNode,
};

const LibraryPage:FC<PageProps> = ({children}) => {
    return (
      <>
        <Header title={intro.library.main.slogan}>
          {/* <Nav></Nav> */}
          {children}
        </Header>

        <Main title={intro.library.main.title} text={intro.library.main.text}>
          <LayoutMainLibrary layout='library' title={intro.library.main.title} text={intro.library.main.text} />
        </Main>

        {/* <Footer title='. F'></Footer> */}
      </>
  );
}

export default LibraryPage;