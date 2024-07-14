import styles from '../../page.module.css'

export default function Login() {
    return (
    <div className={styles.centerColumn}>
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="text-xl">
          Enter your email and password to login.
        </p>
    </div>
  );

}