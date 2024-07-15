// LIBRARY - PAGE. отвеч.за серверную часть
import React, {FC} from 'react'
import { Header, Nav, Main, LayoutMainEvents } from "@/components"
import {intro} from '@/constants'

type PageProps = {
  children: React.ReactNode,
};

const EventsPage:FC<PageProps> = ({children}) => {
    return (
      <>

        <Header title={intro.events.slogan}>
          {/* <Nav></Nav> */}
          {children}
        </Header>

        <Main title={intro.events.title} text={intro.events.text}>
          <LayoutMainEvents layout={'library'} title={intro.events.title} text={intro.events.text} />
        </Main>

        {/* <Footer title='. Ev'></Footer> */}

      </>
  );
}

export default EventsPage;