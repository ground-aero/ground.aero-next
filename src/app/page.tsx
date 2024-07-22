import type { Metadata } from 'next'
import HomePage from './Home'
import "../app/globals.css"
import { fetchData } from '@/utils/api'

export const metadata: Metadata = {
  title: "ground.aero - home",
  description: "ground.aero - dedicated to bridging both sides, airlines & ground handling sectors across the international air transport industry",
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

 return (
  <HomePage events={data}/>
 )
}

export default RootPage;
