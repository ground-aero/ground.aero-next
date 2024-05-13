import type { AppProps } from 'next/app';
import RootLayout from './layout';
import Image from "next/image";
import "./globals.css";
import styles from "./page.module.css";
import Link from "next/link";
import { Layout } from "@/components/ui/Layout";
import {Footer, Header} from "@/components";
import {intro} from "@/constants";

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <>  
      <Header title={intro.main.title} text={intro.main.text}></Header>

      <main className={styles.main}>

        <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/images/groundaero_logoline12.png"
                alt="ground Logo"
                className={styles.groundLogo}
                width={300}
                height={40}
                priority
              />
            </a>
          </div>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/app/page.tsx</code>
          </p>
          
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>Explore starter templates for Next.js.</p>
          </a>

          <Link
            href="/library"
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
        </div>

      </main>

      <Footer title='. F'></Footer>
    </>
    
  );
}
