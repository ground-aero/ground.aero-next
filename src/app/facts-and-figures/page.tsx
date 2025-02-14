// FACTS & FIGURES - server Page
import React, { FC } from 'react'
import type { Metadata } from 'next'
import { Header, Main, LayoutMainFacts } from "@/components"
import {intro} from '@/constants'
// import { getAllEvents } from '../api/utils/fetchEventsData'

export const metadata: Metadata = {
  title: "facts and figures in ground handling & air transport industry",
  description: "facts and figures in ground handling, international air transport, airlines",
  icons: {},
  verification: {
    google: 'CP9aH_lexoQHX7AuUlUCSMqxgL0CxQafnX0UtGaLS6g',
  },
};

async function FactsPage () {

  // const unifiedEvents = await getAllEvents();

    return (
      <>
        <Header type='events' title={intro.events.slogan}/>

        <Main type='facts' title={intro.events.title} text={intro.events.text}>
          <LayoutMainFacts layout='facts' facts={''}/>
        </Main>
      </>
  );
}

export default FactsPage;