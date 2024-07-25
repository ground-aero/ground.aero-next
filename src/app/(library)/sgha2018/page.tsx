// SGHA2018 - PAGE. отвеч.за серверную часть
import { Heading } from "@/components"
import { NextPage, Metadata } from 'next'
import Library from '../Library'

export const metadata: Metadata = {
  title: "IATA sgha 2018 pdf dowload, sgha 2013 IATA pdf, Library",
  description: "Directory. 1. SGHA 2018 IATA, 2. SGHA 2013 IATA, 3. Ground Handling Vocab",
};

export default function Page() {
    return (
    // <div>
    //   <Heading title='Library/SGHA2018 Header'/>
    //   <h1>_..</h1>
    //   <p>This is a test page for library/SGHA2018.</p>
    // </div>
    <>
    <Library/>
   </>
  );

}