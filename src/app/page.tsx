import type { Metadata } from 'next'
import Home from './Home'
import "../app/globals.css"
import { Roboto } from 'next/font/google'
import { fetchData } from './api/utils/api'
import { fetchEventsData } from './api/utils/fetchEventsData'
import ScrapePage from './api/utils/scrapePage'

export const metadata: Metadata = {
  title: "ground aero - bridge across ground handling & airline industry sectors",
  description: "SGHA 2018 IATA, SGHA 2013, international air transport project dedicated to bridge across the industry",
  icons: {},
};

// type PageProps = {
//   data: {id?: number, title?: string, body?: string}[],
//   children: React.ReactNode,
// };

const url = 'https://jsonplaceholder.typicode.com/posts'

// this get called on every 600000 .s
const RootPage =  async  ()  =>  {

  const data = await fetchData(url);
  const data2 = await fetchEventsData(); // see url in ./api/utils/fetchEventsData
  console.log(data2)

 return (
  <Home events={data2}/>
 )
}

export default RootPage;
