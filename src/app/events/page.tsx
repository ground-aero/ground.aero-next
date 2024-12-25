// EVENTS - PAGE
import React, { FC } from 'react'
import { Header, Main, LayoutMainEvents } from "@/components"
import {intro} from '@/constants'
import {
    fetchEventsDataIATA,
    EventData,
    UnifiedEventData,
    unifyEventData,
    fetchEventsAirportInfo
} from '../api/utils/fetchEventsData'

async function EventsPage () {

  let dataIATA: EventData[] = []
  let dataAirports: EventData[] = []
  let unifiedEvents: UnifiedEventData[] = []

  try {
      dataIATA = await fetchEventsDataIATA(); // fetch data from api
      dataAirports = await fetchEventsAirportInfo()
      unifiedEvents = unifyEventData(dataIATA, dataAirports)
      //  console.log(data)
  } catch (error) {
    console.error('Failed to fetch events data:', error)
      unifiedEvents = []
  }

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