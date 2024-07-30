// сюда будут приходить клиентские данные
// LIBRARY - PAGE
'use client'
import { NextPage } from 'next'
import React, { FC } from 'react'
import { Header, Nav, Main, LayoutMainLibrary } from "@/components"
import { intro } from "@/constants"

const Library: NextPage = () => {
    return (
      <>
        <Header title={intro.library.main.slogan}/>

        <Main type='library' title={intro.library.main.title} text={intro.library.main.text}>
          <LayoutMainLibrary layout={'library'} title={intro.library.main.title} text={intro.library.main.text} />
        </Main>
      </>
  );
}

export default Library;