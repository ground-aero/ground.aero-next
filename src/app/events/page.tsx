// LIBRARY - PAGE. отвеч.за серверную часть
import React, {FC} from 'react'
import { Header, Nav, Main, LayoutMainEvents } from "@/components"
import {intro} from '@/constants'
import { fetchEventsData } from '../api/utils/fetchEventsData'

// type PageProps = Readonly<{
//   children: React.ReactNode,
// }>;
// type TEventsPage = {
  // layout: 'home' | 'events' | 'library' | 'sgha',
  // events: {
  //   linkHref: string,
  //   imgSrc: string,
  //   imgAlt: string,
  //   // title: string,
  //   content: string,
  // }[],
// };

const EventsPage: React.FC = async () => {

  let data = []

  try {
    data = await fetchEventsData(); // trying to fetch data from api // see url in ./api/utils/fetchEventsData
     console.log(data)
  } catch (error) {
    console.error('Failed to fetch events data:', error)
    data = []
  }

    return (
      <>
        <Header type='events' title={intro.events.slogan}>
          {/* <Nav></Nav> */}
        </Header>

        <Main type='events' title={intro.events.title} text={intro.events.text}>
          {/* <LayoutMainEvents type='events' title={intro.events.title} text={intro.events.text} /> */}
          <LayoutMainEvents layout='events' events={data}/>
        </Main>
      </>
  );
}

export default EventsPage;