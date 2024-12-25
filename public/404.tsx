import styles from "./page.module.css"

export default function NotFound() {
    return (
    <div className={styles.centerColumn}>
      <h2 className="text-xl font-bold">Page not found</h2>
      <p className="text-xl font-bold">Could not find requested resource New* 404</p>
    </div>
  );

}