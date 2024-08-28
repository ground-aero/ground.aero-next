// LIBRARY - PAGE
import React from 'react'
import { Header, Main, LayoutMainEvents } from "@/components"
import {intro} from '@/constants'
import { fetchEventsData, EventData } from '../api/utils/fetchEventsData'

const EventsPage: React.FC = async () => {

  let data:EventData[] = []

  try {
    data = await fetchEventsData(); // trying to fetch data from api // see url in ./api/utils/fetchEventsData
    //  console.log(data)
  } catch (error) {
    console.error('Failed to fetch events data:', error)
    data = []
  }

    return (
      <>
        <Header type='events' title={intro.events.slogan}/>

        <Main type='events' title={intro.events.title} text={intro.events.text}>
          <LayoutMainEvents layout='events' events={data}/>
        </Main>
      </>
  );
}

export default EventsPage;