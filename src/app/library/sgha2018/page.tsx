import React, {FC} from 'react'
import { Header, Main, Heading, LayoutMainLibrary } from "@/components"
import {intro} from '@/constants'

type PageProps = {
  children: React.ReactNode,
};

const Sgha2018Page:FC<PageProps> = ({ children }) => {
    return (
      <>
       {/* {children} */}

        <Header title={intro.library.sgha2018.slogan}>
          {children}
        </Header>

        <Main title={intro.library.main.title} text={intro.library.main.text}>
          <LayoutMainLibrary layout='sgha2018' title={intro.library.sgha2018.title} text={intro.library.sgha2018.text} />
        </Main>

        {/* <div>
          <Heading title='Library/SGHA2018 Header'/>
          <h1>_..</h1>
          <p>This is a test page for library/SGHA2018.</p>
        </div> */}
      </>
    );
}

export default Sgha2018Page;