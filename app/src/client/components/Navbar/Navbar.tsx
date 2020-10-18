import React, { useState } from 'react'
import Link from 'next/link'

import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.navMenu}>
        <li className={styles.navItem}>
          <Link href='/'>
            <a className={styles.navLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/about'>
            <a className={styles.navLink}>About</a>
          </Link>
        </li>
      </ul>

      <ul className={styles.userMenu}>
        <li className={styles.navItem}>
          <Link href='/users/register'>
            <a className={styles.navLink}>Register</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href='/users/login'>
            <a className={styles.navLink}>Log In</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
