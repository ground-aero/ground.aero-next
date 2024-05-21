// LIBRARY - PAGE
// отвеч.за серверную часть
import {FC} from 'react'
import { Header, Nav, Main, Footer } from "@/components"
import {intro} from '@/constants'

export default function Page () {
    return (
      <>

        <Header title={intro.library.slogan}>
          <Nav active='LIBRARY'></Nav>
        </Header>

        <Main title={intro.library.title} text={intro.library.text}>

        </Main>

        <Footer title='. F'></Footer>

      </>
  );
}