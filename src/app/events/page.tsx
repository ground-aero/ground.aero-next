// EVENTS - server Page
import React, { FC } from 'react'
import { Header, Main, LayoutMainEvents } from "@/components"
import {intro} from '@/constants'
import { getAllEvents } from '../api/utils/fetchEventsData'

async function EventsPage () {

  const unifiedEvents = await getAllEvents();

    return (
      <>
        <Header type='events' title={intro.events.slogan}/>

        <Main type='events' title={intro.events.title} text={intro.events.text}>
          <LayoutMainEvents layout='events' events={ unifiedEvents }/>
        </Main>
      </>
  );
}

export default EventsPage;