// CONTACTS - PAGE. отвеч.за серверную часть
import React, {FC} from 'react'
import { Header, Nav, Main, LayoutMainContacts } from "@/components"
import {intro} from '@/constants'

const ContactsPage: React.FC = async () => {

    return (
      <>
        <Header type='contacts' title={intro.events.slogan}>
          {/* <Nav></Nav> */}
        </Header>

        <Main type='contacts' title={intro.events.title} text={intro.events.text}>
          {/* <LayoutMainEvents type='events' title={intro.events.title} text={intro.events.text} /> */}
          {/* <LayoutMainEvents layout='events' events={data2}/> */}
          <LayoutMainContacts layout={'contacts'}/>
        </Main>

        {/* <Footer title='. Ev'></Footer> */}
      </>
  );
}

export default ContactsPage;