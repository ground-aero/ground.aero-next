// LIBRARY - HOME PAGE. отвеч.за серверную часть
import { NextPage, Metadata } from 'next'
import Library from './Library'

export const metadata: Metadata = {
  title: "IATA sgha 2018 pdf dowload, sgha 2013 IATA pdf, Library",
  description: "Directory. 1. SGHA 2018 IATA, 2. SGHA 2013 IATA, 3. Ground Handling Vocab",
};

const LibraryPage: NextPage = () => {
    return (
      <>
       <Library/>
      </>
  );
}

export default LibraryPage;