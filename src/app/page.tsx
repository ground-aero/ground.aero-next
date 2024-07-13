import type {Metadata} from 'next'
import Home from './Home'
import "../app/globals.css"
import {fetchData} from '@/utils/api'

export const metadata: Metadata = {
  title: "ground.aero - home",
  description: "ground.aero - dedicated to bridging both sides, airlines & ground handling sectors across the international air transport industry",
  icons: {},
};

type PageProps = {
  data: {id?: number, title?: string, body?: string}[],
  children: React.ReactNode,
  url: string,
};

let url = 'https://jsonplaceholder.typicode.com/posts'

// this get called on every 600000 .s
const Page =  async  ({children}: PageProps)  =>  {

  const data = await fetchData(url);

 return (
  <Home events={data}>
    {children}
  </Home>
 )
}

export default Page;
