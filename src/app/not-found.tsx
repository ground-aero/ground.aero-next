import { Main, Footer, LayoutMainLibrary } from "@/components"
import styles from "./page.module.css"
import {intro} from '@/constants'

export default function NotFound() {
    return (
      <>
          <div className={styles.container}>
            <div className={styles.centerColumn}>
              <h2>Page not found</h2>
              <p>Could not find requested resource</p>
            </div>
          </div>  
          <Footer/>
      </>
  );
}