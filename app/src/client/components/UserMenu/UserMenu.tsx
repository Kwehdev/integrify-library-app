import Link from 'next/link'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import styles from './UserMenu.module.css'

export default function UserMenu() {
  const { user } = useAuth()

  return (
    <div className={styles.container}>
      <p>
        <strong>{user.username}</strong>
      </p>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link href='/profile'>
            <a className={styles.navLink}>My Profile</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/profile/update'>
            <a className={styles.navLink}>Update Profile</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
