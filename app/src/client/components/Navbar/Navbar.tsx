import { useContext } from 'react'
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
      <div className={styles.navMenu__right}>
        {isAuthenticated ? (
          <>
            <p className={styles.navText}>
              Signed in as <strong>{user.username}</strong>
            </p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link href='/users/register'>
            <a className={styles.navLink}>Register</a>
          </Link>
        )}
      </div>
    </nav>
  )
}
