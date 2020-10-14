import Head from 'next/head'
import React, { useContext } from 'react'
import PageLayout from '../src/client/components/PageLayout'
import ThemeContext from '../src/client/context/ThemeContext'

import styles from '../styles/About.module.css'

export default function About() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryBGColor } = appTheme

  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - About</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={styles.container}
        style={{ backgroundColor: primaryBGColor }}
      ></main>
    </PageLayout>
  )
}
