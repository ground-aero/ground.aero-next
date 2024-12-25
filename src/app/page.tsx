import type { Metadata } from 'next'
import Head from 'next/head'
import Home from './Home'
import "../app/globals.css"
import {fetchEventsDataIATA, fetchEventsAirportInfo, EventData, UnifiedEventData, unifyEventData} from './api/utils/fetchEventsData'

export const metadata: Metadata = {
  title: "ground aero - bridge across ground handling & airline industry sectors",
  description: "SGHA 2018 IATA, SGHA 2013, ground handling, airlines, air transport industry events, international air transport",
  icons: {},
  verification: {
    google: 'CP9aH_lexoQHX7AuUlUCSMqxgL0CxQafnX0UtGaLS6g',
  },
};

// this get called on every page load
const RootPage =  async  ()  =>  {

  let dataIATA: EventData[] = []
  let dataAirports: EventData[] = []
    let unifiedEvents: UnifiedEventData[] = []

  try {
      dataIATA = await fetchEventsDataIATA(); // see url in ./api/utils/fetchEventsDataIATA
      dataAirports = await fetchEventsAirportInfo();
      // Объединяем и унифицируем данные
      unifiedEvents = unifyEventData(dataIATA, dataAirports);

console.log('unifiedEvents on App.page:', unifiedEvents)

  } catch (error) {
    console.error('Failed to fetch events data:', error)
      unifiedEvents = []
  }

    // console.log('data on App.page:',data2)

 return (
  <>
    <Head>
        <meta name="yandex-verification" content="7bb4795441ba9048" />
    </Head>
    <Home events={ unifiedEvents }/>
  </>
 )
}

export default RootPage;
