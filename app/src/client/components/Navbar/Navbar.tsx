import React, { useState } from 'react'
import Link from 'next/link'

import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.navMenu}>
        <li className={styles.navMenuItem}>
          <Link href='/'>
            <a className={`${styles.navLink} ${styles.navLink__active}`}>
              Home
            </a>
          </Link>
        </li>
      </ul>

      <ul className={styles.userMenu}>
        <li className={styles.navMenuItem}>
          <Link href='/users/register'>
            <a className={styles.navLink}>Register</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
