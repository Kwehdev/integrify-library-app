import { useContext } from 'react'
import Link from 'next/link'

import ThemeContext, { Themes } from '../../context/ThemeContext'
import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <Link href='/users/register'>
        <a>Register</a>
      </Link>
    </nav>
  )
}
