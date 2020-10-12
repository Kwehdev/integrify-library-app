import { useContext } from 'react'
import ThemeContext, { Themes } from '../../context/ThemeContext'
import styles from './navbar.module.css'

export default function Navbar() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { navBGColor, navTextColor } = appTheme

  return (
    <nav
      className={styles.container}
      style={{ backgroundColor: navBGColor, color: navTextColor }}
    >
      This is navbar
    </nav>
  )
}
