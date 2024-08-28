// Sub-component to MAIN // src/components/LayoutMainSgha.tsx
import React from 'react'
import Link from 'next/link'
import styles from '../app/page.module.css'
import Image from 'next/image'
import {intro} from "@/constants"
import FormattedText from "../utils/FormattedText"

type TLayoutMainSgha = {
  layout: 'home' | 'events' | 'library' | 'sgha',
  title: string,
  subtitleBold: string,
  subtitleNormal: string,
  text: string | null,
};

export const LayoutMainSgha: React.FC<TLayoutMainSgha> = ({ layout, title, subtitleBold, subtitleNormal, text }) => {
  return (
    <>
      {layout==='sgha' ? (
        <> 
          <div id={styles.main_box} className={styles.box__content}>

            <div className={`${styles.box__empty_center}`} >
              <span className={`${styles.decor_bar} ${styles.decorBarLarge}`}></span>
              <h1 className={styles.intro_main_title}>{intro.library.sgha2018.title}</h1>
            </div>
            <h2 className={styles.intro_main_subtitle}>{intro.library.sgha2018.subtitleBold}</h2>
            <h3 className={styles.intro_main_subtitle_secondary}>{intro.library.sgha2018.subtitleNormal}</h3>
            {/* <p className={styles.intro__text}>{text}</p> */}

            <div className={`${styles.box__inner_content} ${styles.box__inner_content_paddings}`}>
              <Image
                  src="/iata_stripes.jpg" alt="arrows" width={1200} height={127} className={styles.img__iatastripes}
              />
              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_colored}`}>What are the changes until now in v.2018?</p>
              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_dark}`}>Main Agreement:</p>
              <div className={styles.box__content_formatted_text}>
                <FormattedText text={intro.library.sgha2018.textMainAgreement} />
              </div>
              {/* <p className={styles.paragraph_text}>{intro.library.sgha2018.textMainAgreement}</p> */}
              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_dark}`}>Annex A:</p>
              <div className={styles.box__content_formatted_text}>
                <FormattedText text={intro.library.sgha2018.textAnnexA} />
              </div>
              <p className={`${styles.intro_main_subtitle} ${styles.intro_main_subtitle_dark}`}>Annex B:</p>
              <div className={styles.box__content_formatted_text}>
                <FormattedText text={intro.library.sgha2018.textAnnexB} />
              </div>
            </div>
          </div>

          <aside id={styles.aside_box} className={styles.aside_box}>

            <div className={`${styles.empty__inner} ${styles.box__empty_center}`}> 
              <p className={styles.intro__title}>{'Publications'}</p>
              <Image
                  src="/images/arrows2.png" alt="arrows" width={22} height={22}
              />                      
            </div>
          </aside>

          <aside id={styles.aside_box_bottom} className={styles.aside_box}>

            <div className={`${styles.box__content} ${styles.box__content_center}`}>
              {/* Quote aside */}
              <div className={`${styles.box__content_left} ${styles.box__content_formatted_text} ${styles.display_none}`}>
                <FormattedText text={intro.library.sgha2018.quoteAside} />
              </div>
              {/* Broschures imgs*/}
              <Link href="https://drive.google.com/uc?export=download&id=1-hDdEedUiOdFlNIZdYn0fgLu5L-p9pS5" target="_self" rel="noopener noreferrer">
                <div className={`${styles.box__content} ${styles.box__inner_content_center}`}>
                  <p className={`${styles.intro__text} ${styles.intro__text_type_padding}`} >SGHA 2018/ 2013</p>
                  <p className={`${styles.intro__text} ${styles.intro__text_type_padding}`} >IATA AHM 810</p>
                  <Image
                      src="/sgha_2018_cover.jpg" alt="sgha 2018" width={145} height={217} className={styles.img__sgha_cover} 
                  />
                </div>
              </Link>
              <Link href="https://drive.google.com/uc?export=download&id=1-hDdEedUiOdFlNIZdYn0fgLu5L-p9pS5" target="_self" rel="noopener noreferrer">
                <div className={`${styles.box__content} ${styles.box__inner_content_center}`}>
                  <p className={`${styles.intro__text} ${styles.intro__text_type_padding}`} >SGHA 2013/ 2008</p>
                  <p className={`${styles.intro__text} ${styles.intro__text_type_padding}`} >IATA AHM 810</p>
                  <Image
                      src="/sgha_2013_cover.jpg" alt="sgha 2013" width={145} height={217} className={styles.img__sgha_cover} 
                  />
                </div>
              </Link>
            </div>
          </aside>
        </>) : ''
      }
    </>
  );
};