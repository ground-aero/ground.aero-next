import styles from '../../page.module.css'

export default function ForgotPassword() {
    return (
      <div className={styles.container}>
        <div className={styles.centerColumn}>
            <h1>Forgot password</h1>
            <p>
              Enter your email to reset your password.
            </p>
        </div>
      </div>
  );
}