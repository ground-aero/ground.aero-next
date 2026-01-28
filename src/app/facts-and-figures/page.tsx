// FACTS & FIGURES - server Page
import React, { FC } from 'react'
import type { Metadata } from 'next'
import { Header, Main, LayoutMainFacts } from "@/components"
import {intro} from '@/constants'
import styles from "@/app/page.module.css";
import Image from "next/image";
// import { getAllEvents } from '../api/utils/fetchEventsData'

export const metadata: Metadata = {
  title: "facts and figures in ground handling & air transport industry",
  description: "facts and figures in ground handling, international air transport, airlines",
  icons: {},
  verification: {
    google: 'CP9aH_lexoQHX7AuUlUCSMqxgL0CxQafnX0UtGaLS6g',
  },
};

async function FactsPage () {

  // const unifiedFacts = await getAllFacts();

    return (
      <>
        <Header type='facts' title={intro.events.slogan}/>

        {/*{ unifiedFacts.length === 0 */}
        {/*  ? (*/}
        {/*      <Main type='facts' title={intro.events.title} text={intro.events.text}>*/}
        {/*        <span className={styles.flex__nodata}>*/}
        {/*          <Image src={"/images/nodata.png"} alt="no data" width={55} height={55} />*/}
        {/*        </span>*/}
        {/*      </Main>*/}
        {/*    )*/}
        {/*  : (*/}
        {/*      <Main type='facts' title={intro.events.title} text={intro.events.text}>*/}
        {/*        <LayoutMainFacts layout='facts' facts={''}/>*/}
        {/*      </Main>*/}
        {/*    )*/}
        {/*}*/}

        <Main type='facts' title={intro.events.title} text={intro.events.text}>
          <LayoutMainFacts layout='facts' facts={''}/>
        </Main>
      </>
  );
}

export default FactsPage;