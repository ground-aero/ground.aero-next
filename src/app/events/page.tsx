// LIBRARY - PAGE. отвеч.за серверную часть
import React, {FC} from 'react'
import { Header, Nav, Main, LayoutMainEvents } from "@/components"
import {intro} from '@/constants'

// type PageProps = Readonly<{
//   children: React.ReactNode,
// }>;

const EventsPage = () => {
    return (
      <>

        <Header type='events' title={intro.events.slogan}>
          {/* <Nav></Nav> */}
        </Header>

        <Main type='events' title={intro.events.title} text={intro.events.text}>
          <LayoutMainEvents type='events' title={intro.events.title} text={intro.events.text} />
        </Main>

        {/* <Footer title='. Ev'></Footer> */}

      </>
  );
}

export default EventsPage;