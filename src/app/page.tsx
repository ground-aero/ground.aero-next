import type { Metadata } from 'next'
import Head from 'next/head'
import Home from './Home'
import "./globals.css"
import { getAllEvents } from './api/utils/fetchEventsData'

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

const unifiedEvents = await getAllEvents();

// console.log('unifiedEvents on App.page:', unifiedEvents)

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
