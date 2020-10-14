import Head from 'next/head'
import React, { useContext } from 'react'
import FilterMenu from '../src/client/components/FilterMenu'
import PageLayout from '../src/client/components/PageLayout'
import ThemeContext from '../src/client/context/ThemeContext'

import styles from '../styles/Library.module.css'

export default function Library() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryBGColor, secondaryBGColor } = appTheme

  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Library</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={styles.container}
        style={{ backgroundColor: primaryBGColor }}
      >
        <div
          className={styles.sideBar}
          style={{ borderRight: `5px solid ${secondaryBGColor}` }}
        >
          <FilterMenu />
        </div>
        <div className={styles.bookContainer}>Books</div>
      </main>
    </PageLayout>
  )
}
