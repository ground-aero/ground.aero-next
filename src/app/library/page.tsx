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
        {children}
        {/* <Header title={intro.library.slogan}> */}
          {/* <Nav></Nav> */}
          {/* {children} */}
        {/* </Header> */}

        {/* <Main title={intro.library.title} text={intro.library.text}>
          <LayoutMainLibrary layout={'library'} title={intro.library.title} text={intro.library.text} />
        </Main> */}

        {/* <Footer title='. F'></Footer> */}
      </>
  );
}

export default LibraryPage;