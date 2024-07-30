// HOME - PAGE
'use client'
import React, { FC } from 'react'
import "../app/globals.css"
import styles from "./page.module.css"
import { Header, Nav, Main, LayoutMainHome } from "@/components"
import { intro } from "@/constants"
import Link from 'next/link'

  type THome = {
    events: {id: number, title: string, body: string}[] | [],
    // children: React.ReactNode,
  };

const Home:FC<THome> = ({ events }) => {return (

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

        <Link
            href="/sgha2018"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              MY LIBRARY <span>-&gt;</span>
            </h2>
            <p>
              Link to my ground,.aero Library
            </p>
          </Link>
          
      </Main>

    </>

   )
}

export default Home
