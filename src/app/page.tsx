import type { Metadata } from 'next'
import Home from './Home'
import "../app/globals.css"
import { fetchEventsData, EventData } from './api/utils/fetchEventsData'

export const metadata: Metadata = {
  title: "ground aero - bridge across ground handling & airline industry sectors",
  description: "SGHA 2018 IATA, SGHA 2013, ground handling, airlines, air transport industry events, international air transport",
  icons: {},
};

// this get called on every page load
const RootPage =  async  ()  =>  {

  let data:EventData[] = []

  try {
    data = await fetchEventsData(); // see url in ./api/utils/fetchEventsData
    //  console.log(data)
  } catch (error) {
    console.error('Failed to fetch events data:', error)
  }

 return (
  <Home events={data}/>
 )
}

export default RootPage;
