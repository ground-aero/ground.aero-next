import type {Metadata} from 'next'
import HomePage from './Home'
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
};

let url = 'https://jsonplaceholder.typicode.com/posts'

// this get called on every request
// const fetchData = async () => {
//   // fetch data from external API // 600000 = 1 week
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//     next: {revalidate:  600000,
//    },
//   });
//   const data = await res.json();

//   if(!data){
//     return {
//       notFound: true,
//     }
//   }
//   // Pass data to the Page via props
//   // return {
//   //   props: {
//   //     // commits: data
//   //     data,
//   //   }
//   // }
//   return data
// }
// // this get called on every request
// export async function getServerSideProps() {
//   // fetch data from external API
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();

//   if(!data){
//     return {
//       notFound: true,
//     }
//   }
//   // Pass data to the Page via props
//   return {
//     props: {
//       // commits: data
//       data,
//     }
//   }
// }

// export default async function Page () {
  
//   const data  = await fetchData();

//   return <Home events={data}/>
// }
const Page =  async  ({children}: PageProps)  =>  {
  const data = await fetchData(url);
 return (
  <HomePage events={data}>
    {children}
  </HomePage>
 )
}

export default Page;
