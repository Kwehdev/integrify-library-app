import React, { useMemo, useState } from 'react'
import Link from 'next/link'

import styles from './Navbar.module.css'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
  const { user, isAuthenticated } = useAuth()

  //Todo Refactor
  const UserMenu = useMemo(() => {
    if (!isAuthenticated) {
      return (
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
      )
    }

    if (isAuthenticated) {
      return (
        <ul className={styles.userMenu}>
          <li className={styles.navItem}>
            <p className={styles.greeting}>
              Hello, <strong>{user.username}</strong>
            </p>
          </li>
        </ul>
      )
    }
  }, [user, isAuthenticated])

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

      {UserMenu}
    </nav>
  )
}
