import { useContext } from 'react'
import Link from 'next/link'

import ThemeContext, { Themes } from '../../context/ThemeContext'
import styles from './navbar.module.css'
import UserContext from '../../context/UserContext'

export default function Navbar() {
  const { user } = useContext(UserContext)

  return (
    <nav className={styles.container}>
      <div className={styles.navMenu__right}>
        {user ? (
          <p className={styles.navText}>
            Signed in as <strong>{user.username}</strong>
          </p>
        ) : (
          <Link href='/users/register'>
            <a className={styles.navLink}>Register</a>
          </Link>
        )}
      </div>
    </nav>
  )
}
