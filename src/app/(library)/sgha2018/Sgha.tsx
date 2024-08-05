// сюда будут приходить клиентские данные
// SGHA - PAGE
'use client'
import { NextPage } from 'next'
import React, { FC } from 'react'
import { Header, Nav, Main, LayoutMainSgha } from "@/components"
import { intro } from "@/constants"

const Sgha: NextPage = () => {
    return (
      <>
        <Header title={intro.library.main.slogan}/>

        <Main type='library' title={intro.library.main.title} text={intro.library.main.text}>
          <LayoutMainSgha layout={'sgha'} 
            title={intro.library.main.title} 
            subtitleBold={intro.library.sgha2018.subtitleBold}
            subtitleNormal={intro.library.sgha2018.subtitleNormal} 
            text={intro.library.main.text} 
          />
        </Main>
      </>
  );
}

export default Sgha;