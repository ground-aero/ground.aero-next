'use client';
import { login } from '../actions'
import Link from 'next/link'
import styles from '../../page.module.css'

export default function Login() {
    return (
    <div className={styles.centerColumn}>
        <h1>Login</h1>
        <p>Enter your email and password to login.</p>

            {/* <form onSubmit={send}> */}
            <form action={ login }>
                <button type="submit">Login</button>
            </form>
            
            <br/>
            <p>Do not have an account?       
                <Link href="/register" className={styles.nav} rel="noopener noreferrer">
                    Register
                </Link>
            </p>

            <p></p> 

    </div>
  );

}