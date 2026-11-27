import Link from 'next/link'
import { Header, Main } from '@/components'
import { intro } from '@/constants'
import styles from './page.module.css'

export default function NotFound() {
  return (
    <>
      <Header
        type="home"
        title="Page not found"
      />

      <Main
        type="not-found"
        title="404 — page not found"
        text="The resource does not exist, or has been replaced."
      >
        <div id={styles.flex_not_found}>
          <h2 className="font-bold">404</h2>

          <p className="text-xl font-semibold">
            The requested page was not found
          </p>

          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Return to Main
          </Link>
        </div>
      </Main>
    </>
  )
}