import styles from '../../page.module.css'

export default function Register() {
    return (
      <div className={styles.container}>
        <div className={styles.centerColumn}>
            <h1>Register</h1>
            <p>
              Enter your email and password to register.
            </p>
        </div>
      </div>
    );
}