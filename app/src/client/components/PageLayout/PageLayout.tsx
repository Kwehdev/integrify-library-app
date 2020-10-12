import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'

import styles from './pagelayout.module.css'

export default function PageLayout({ children }) {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryBGColor } = appTheme
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: primaryBGColor }}
    >
      <Header />
      {children}
    </div>
  )
}
