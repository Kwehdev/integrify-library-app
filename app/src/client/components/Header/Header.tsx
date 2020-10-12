import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'

import Navbar from '../Navbar'

import styles from './header.module.css'

export default function Header() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryBGColor, primaryTextColor, secondaryBGColor } = appTheme

  return (
    <header
      className={styles.container}
      style={{
        backgroundColor: primaryBGColor,
        color: primaryTextColor,
        borderBottom: `5px solid ${secondaryBGColor}`,
      }}
    >
      <Navbar />
    </header>
  )
}
