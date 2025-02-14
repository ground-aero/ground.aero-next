// Sub-component to MAIN // src/components/LayoutMainFacts.tsx
'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../app/page.module.css'
import { TUnifiedEvent } from "@/app/api/utils/fetchEventsData";

type TLayoutMainFacts = {
  layout: 'home' | 'events' | 'library' | 'sgha' | 'facts',
  // facts: TUnifiedEvent[],
  facts: string,
};

// EventCard component
const EventCard: React.FC<{ event: TUnifiedEvent }> = ({ event }) => {
  return (
    <Link
      href={event.linkHref}
      className={styles.events__link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {event.imgSrc && (
        <img
          src={event.imgSrc}
          className={styles.img__event_card}
          alt={event.imgAlt || 'Event image'}
          width={375}
          height={213}
        />
      )}
      <div className={styles.events__content}>
        <div className={styles.img__event_title}>{event.title}</div>
        {event.venue && <div className={styles.event__venue}>{event.venue}</div>}
        {event.dates?.formatted && (
          <div className={styles.event__date}>{event.dates.formatted}</div>
        )}
      </div>
    </Link>
  )
}

// EventsList component
const EventsList: React.FC<{ events: TUnifiedEvent[] }> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
        <p className={`${styles.events__item} ${styles.events__item_notavailable}`}>
          No events available at the moment. Please check back later.
        </p>
      </div>
    )
  }

  return (
    <ul id={styles.events_list} className={`${styles.intro__list} ${styles.box__content} ${styles.box__content_main}`}>
      {events.map((event) => (
        <li key={event.id} className={styles.events__item}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  )
}

export const LayoutMainFacts: React.FC<TLayoutMainFacts> = ({ layout, facts }) => {
  if (layout !== 'facts') return null;

  return (
    <>
      <div
        id={styles.banner_header_events}
        className={`${styles.box__empty_center} ${styles.box__empty_right} ${styles.box__empty}`}
      >
        <div className={styles.empty__inner} />
      </div>

      <section id={styles.main_box} className={styles.box__content}>
        <h1 className={styles.semantic_tag_invisible}>
          Facts and figures in air transport, ground handling industry
        </h1>

        {/*<EventsList events={events} />*/}

      </section>

      <aside
        id={styles.aside_box}
        className={`${styles.aside_box} ${styles.aside_box_events}`}
      >
        <div className={`${styles.empty__inner} ${styles.box__empty_center}`}>
          <Image
            src="/images/arrows2.png"
            alt="arrows"
            width={22}
            height={22}
            className={styles.img__arrows_transform}
          />
          <h3 className={styles.intro__title}>Facts</h3>
        </div>
      </aside>
    </>
  )
}