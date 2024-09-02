// CONTACTS - PAGE. отвеч.за серверную часть
import React from 'react'
import { Metadata } from 'next'
import { Header, Main, LayoutMainContacts } from "@/components"
import {intro} from '@/constants'

export const metadata: Metadata = {
  title: "ground aero services",
  description: "contact ground aero, partnership, ground aero sales, locations",
};

const ServicesPage: React.FC = async () => {
    return (
      <>
        <Header type='contacts' title={intro.events.slogan}/>

        <Main type='contacts' title={intro.services.title} text={intro.services.text}>
          {/* <LayoutMainEvents type='events' title={intro.events.title} text={intro.events.text} /> */}
          {/* <LayoutMainEvents layout='events' events={data2}/> */}
          <LayoutMainContacts layout={'contacts'}/>
        </Main>
      </>
  );
}

export default ServicesPage;