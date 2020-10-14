import { useContext, useMemo } from 'react'
import Link from 'next/link'
import { RiMoonLine, RiSunFill } from 'react-icons/ri'

import styles from './navbar.module.css'
import { UserContext } from '../../context/UserContext/UserContext'
import request, { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import ThemeContext, { DarkTheme, LightTheme } from '../../context/ThemeContext'

export default function Navbar() {
  const { user, reAuthenticate, isAuthenticated } = useContext(UserContext)
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
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
        <li className={styles.menuItem}>
          <Link href='/library'>
            <a className={styles.menuLink}>Library</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/about'>
            <a className={styles.menuLink}>About</a>
          </Link>
        </li>
      </ul>
      <ul className={styles.menu} style={{ marginLeft: `auto` }}>
        {isAuthenticated ? (
          <>
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
          </>
        ) : (
          <>
            <li className={styles.menuItem}>
              <Link href='/users/register'>
                <a className={styles.menuLink}>Register</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href='/users/login'>
                <a className={styles.menuLink}>Login</a>
              </Link>
            </li>
          </>
        )}
        <li className={styles.menuItem}>
          {appTheme === DarkTheme ? (
            <RiSunFill
              className={`${styles.menuSun} ${styles.menuIcon}`}
              onClick={() => setCurrentTheme(LightTheme)}
            />
          ) : (
            <RiMoonLine
              className={`${styles.menuMoon} ${styles.menuIcon}`}
              onClick={() => setCurrentTheme(DarkTheme)}
            />
          )}
        </li>
      </ul>
    </nav>
  )
}
