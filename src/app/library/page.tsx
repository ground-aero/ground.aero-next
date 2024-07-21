// LIBRARY - PAGE. отвеч.за серверную часть
import { NextPage } from 'next'
import React, {FC} from 'react'
import { Header, Nav, Main, LayoutMainLibrary, Footer } from "@/components"
import {intro} from '@/constants'

// type OmitWithTag<T, K extends keyof T, NewType> = Omit<T, K> & Record<K, NewType>;

// type Diff<T, U> = T extends U ? never : T;

// type PageProps = Readonly<{
//   children: React.ReactNode;
// }>;



const LibraryPage: NextPage = () => {
    return (
      <>

        <Header title={intro.library.slogan}>
          {/* <Nav></Nav> */}
        </Header>

        <Main title={intro.library.title} text={intro.library.text}>
          <LayoutMainLibrary layout={'library'} title={intro.library.title} text={intro.library.text} />
        </Main>

        <Footer title='. F'></Footer>

      </>
  );
}

export default LibraryPage;