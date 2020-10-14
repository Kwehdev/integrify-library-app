import { useContext, useMemo } from 'react'
import Link from 'next/link'

import styles from './navbar.module.css'
import { UserContext } from '../../context/UserContext/UserContext'
import request, { gql } from 'graphql-request'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { user, reAuthenticate, isAuthenticated } = useContext(UserContext)

  const router = useRouter()

  const handleLogout = async () => {
    const query = gql`
      mutation LogoutUser {
        logoutUser
      }
    `
    const { logoutUser } = await request('/api/v1/graphql', query)
    console.log(logoutUser)
    await reAuthenticate()
    await router.push('/')
  }

  return (
    <nav className={styles.container}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link href='/'>
            <a className={styles.menuLink}>Home</a>
          </Link>
        </li>
      </ul>

      {isAuthenticated ? (
        <ul className={styles.menu} style={{ marginLeft: `auto` }}>
          <li className={styles.menuItem}>
            <p className={styles.greeting}>
              Hello, <strong>{user.username}</strong>
            </p>
          </li>
          <li className={styles.menuItem}>
            <button
              onClick={handleLogout}
              className={`${styles.menuItem} ${styles.menuBtn}`}
            >
              Log out
            </button>
          </li>
        </ul>
      ) : (
        <ul className={styles.menu} style={{ marginLeft: `auto` }}>
          <li className={styles.menuItem}>
            <Link href='/users/register'>
              <a className={styles.menuLink}>Register</a>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}
