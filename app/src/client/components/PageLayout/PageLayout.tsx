import Head from 'next/head'
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
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <Header />
      {children}
    </div>
  )
}
