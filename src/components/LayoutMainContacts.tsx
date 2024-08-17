// Sub-component to MAIN // src/components/LayoutMainEvents.tsx
import React from 'react'
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import styles from '../app/page.module.css'

const outfit = Outfit({
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
})

type TLayoutMainContacts = {
  layout: 'home' | 'contacts',
  // title: string | null, 
};

export const LayoutMainContacts: React.FC<TLayoutMainContacts> = ({ layout }) => {
  return (
    <>
      {layout==='contacts' ? (
        <> 
        {/* --- main box --- */}
          <section id={styles.main_box_contacts} className={`${styles.box__content}`}>
            {/* <p className={styles.intro_main_title}>{title}</p> */}
            {/* <h1 className={styles.intro__text}>{text}</h1> */}

            {/* <ul id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
              <p>Here Contacts</p>
            </ul> */}
            <div className={styles.box__left_type_contacts}>
              <p className={`${outfit.className} ${styles.box__left_contacts_letter}`}>C</p>
            </div>
            <div className={styles.box__right_type_contacts}>
              <div className={styles.wrap__contacts_text}>
                <p className={`${styles.contacts__text} ${styles.contacts__text_bold} `}>Overseas Sales Office</p>
                <p className={styles.contacts__text}>Evgeniy Avdeev</p>
                <p className={styles.contacts__text}>e.avdeev@ground.aero</p>
              </div>
              <Image src="/images/3d-world-map.png" alt="globe img" width={350} height={350} loading="lazy" className={styles.box__contacts_img_bg}/>
            </div>

          </section>

          {/* -- aside right -- */}
          <aside id={styles.aside_box_contacts} className={`${styles.aside_box}`}>
            {/* <div className={`${styles.empty__inner} ${styles.box__empty_center}`}> 
              <h3 className={styles.intro__title}>{'...'}</h3>
              <Image
                  src="/images/arrows2.png" alt="arrows" width={22} height={22}
              /> 
            </div> */}
          </aside>
        </>) : ''
      }
    </>
  );
};