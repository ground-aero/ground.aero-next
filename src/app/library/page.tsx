// LIBRARY - PAGE. отвеч.за серверную часть
import { NextPage } from 'next'
import React, {FC} from 'react'
import { Header, Nav, Main, LayoutMainLibrary, Footer } from "@/components"
import {intro} from '@/constants'

// type PageProps = Readonly<{
//   children: React.ReactNode;
// }>;

const LibraryPage: NextPage = () => {
    return (
      <>

        <Header title={intro.library.main.slogan}>
          {/* <Nav></Nav> */}
        </Header>

        <Main title={intro.library.main.title} text={intro.library.main.text}>
          <LayoutMainLibrary layout={'library'} title={intro.library.main.title} text={intro.library.main.text} />
        </Main>

        {/* <Footer title='. F'></Footer> */}

      </>
  );
}

export default LibraryPage;