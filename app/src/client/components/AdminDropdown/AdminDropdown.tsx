import Link from 'next/link'
import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import styles from './admindropdown.module.css'

export default function AdminDropdown() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)

  const { primaryBGColor, primaryTextColor, secondaryBGColor } = appTheme
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: primaryBGColor, color: primaryTextColor }}
    >
      <p className={styles.title}>Admin</p>
      <ul
        className={styles.menu}
        style={{
          borderLeft: `5px solid ${secondaryBGColor}`,
          borderBottom: `5px solid ${secondaryBGColor}`,
          borderRight: `5px solid ${secondaryBGColor}`,
        }}
      >
        <li className={styles.menuItem}>
          <Link href='/authors/new'>
            <a className={styles.menuLink}>Create new author</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/books/new'>
            <a className={styles.menuLink}>Create new book</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
