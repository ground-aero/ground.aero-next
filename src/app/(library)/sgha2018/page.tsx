// SGHA2018 - PAGE. отвеч.за серверную часть
import { Metadata } from 'next'
import Sgha from './Sgha'

export const metadata: Metadata = {
  title: "IATA sgha 2018 pdf dowload, sgha 2013 IATA pdf, sgha handbook",
  description: "SGHA 2018 IATA overview, SGHA 2013 IATA, standard ground handling agreement pdf download",
};

export default function Page() {
  return (    
    <Sgha/>
  );
}