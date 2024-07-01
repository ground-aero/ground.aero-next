// LIBRARY - PAGE. отвеч.за серверную часть
import React, {FC} from 'react'
import { Header, Nav, Main, LayoutMainLibrary, Footer } from "@/components"
import {intro} from '@/constants'

type PageProps = {
  children: React.ReactNode,
};

const LibraryPage:FC<PageProps> = ({children}) => {
    return (
      <>

        <Header title={intro.library.slogan}>
          {/* <Nav></Nav> */}
          {children}
        </Header>

        <Main title={intro.library.title} text={intro.library.text}>
          <LayoutMainLibrary layout={'library'} title={intro.library.title} text={intro.library.text} />
        </Main>

        <Footer title='. F'></Footer>

      </>
  );
}

export default LibraryPage;