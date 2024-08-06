// Sub-component to MAIN // src/components/LayoutMainSgha.tsx
import React from 'react'
import styles from '../app/page.module.css'
import Image from 'next/image'
import {intro} from "@/constants"
import FormattedText from "../utils/FormattedText"

type TLayoutMainProps = {
  layout: 'home' | 'events' | 'library' | 'sgha',
  title: string,
  subtitleBold: string,
  subtitleNormal: string,
  text: string | null,
  // children: React.ReactNode;
};

export const LayoutMainSgha: React.FC<TLayoutMainProps> = ({ layout, title, subtitleBold, subtitleNormal, text }) => {
  return (
    <>
      {layout==='sgha' ? (
        <> 
          <div id={styles.main_box} className={styles.box__content}>

            <div className={`${styles.empty__box_center}`} >
              <span className={`${styles.decor_bar} ${styles.decorBarLarge}`}></span>
              <h1 className={styles.intro_main_title}>{intro.library.sgha2018.title}</h1>
            </div>
            <h2 className={styles.intro_main_subtitle}>{intro.library.sgha2018.subtitleBold}</h2>
            <h3 className={styles.intro_main_subtitle_secondary}>{intro.library.sgha2018.subtitleNormal}</h3>
            {/* <p className={styles.intro__text}>{text}</p> */}

            <div className={styles.innerBoxContent}>
              <Image
                  src="/iata_stripes.jpg" alt="arrows" width={1200} height={127} className={styles.imgIataStripes}
              />

              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_colored}`}>What are the changes until now in v.2018?</p>
              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_dark}`}>Main Agreement:</p>
              <FormattedText text={intro.library.sgha2018.textMainAgreement} />
              {/* <p className={styles.paragraph_text}>{intro.library.sgha2018.textMainAgreement}</p> */}
              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_dark}`}>Annex A:</p>
              <FormattedText text={intro.library.sgha2018.textAnnexA} />
              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_dark}`}>Annex B:</p>
              <FormattedText text={intro.library.sgha2018.textAnnexB} />
            </div>

          </div>

          <aside id={styles.aside_box__right} className={styles.aside_box}>
            <div className={`${styles.empty__inner} ${styles.empty__box_center}`}> 
              <h3 className={styles.intro_title}>{'Publications'}</h3>
              <Image
                  src="/images/arrows2.png" className={styles.img__facts} alt="arrows" width={22} height={22}
              />                      
            </div>
          </aside>
        </>) : ''
      }
    </>
  );
};