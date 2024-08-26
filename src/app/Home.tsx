// HOME - PAGE
'use client'
import React, { FC } from 'react'
import "../app/globals.css"
import styles from "./page.module.css"
import { Header, Nav, Main, LayoutMainHome } from "@/components"
import { intro } from "@/constants"
import Link from 'next/link'
import { EventData } from './api/utils/fetchEventsData'

// Определяем тип для пропсов компонента Home
type THome = {
  events: {
    linkHref: string,
    imgSrc: string,
    imgAlt: string,
    content: string
  }[],
};

const Home: FC<THome> = ({ events }) => {
  return (
    <>  
      <Header title={intro.main.slogan}/>

      <Main type='home' title={intro.main.title} text={intro.main.text}>
        <LayoutMainHome 
          layout='home'
          title={intro.main.title} 
          text={intro.main.text} 
          titleFacts={intro.main.titleFacts} 
          textFacts={intro.main.textFacts} 
          titlePublications={intro.main.titlePublications}
          titleEvents={intro.main.titleEvents}
          events={events}>
        </LayoutMainHome>
      </Main>
    </>
  )
}

export default Home