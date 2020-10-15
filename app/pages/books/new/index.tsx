import Head from 'next/head'
import React, { useContext } from 'react'
import PageLayout from '../../../src/client/components/PageLayout'
import ThemeContext from '../../../src/client/context/ThemeContext'
import styles from '../../../styles/NewBook.module.css'

export default function NewBook() {
  const { appTheme } = useContext(ThemeContext)
  const { primaryBGColor } = appTheme

  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Create New Book</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={styles.container}
        style={{ backgroundColor: primaryBGColor }}
      ></main>
    </PageLayout>
  )
}
