'use client';
import { register } from '../actions'
import Link from 'next/link'
import styles from '../../page.module.css'

export default function Register() {
    return (
        <div className={styles.centerColumn}>
            <h1>Register</h1>
            <p>Enter your email and password to register.</p>

            {/* <form onSubmit={send}> */}
            <form action={ register }>
                <button type="submit">Register</button>
            </form>
            
            <br/>
            <p>Already have an account?       
                <Link href="/login" className={styles.nav} rel="noopener noreferrer">
                    Login
                </Link>
            </p>

            <p></p> 

        </div>
      );
}