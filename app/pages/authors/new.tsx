import Head from 'next/head'
import React, { useContext } from 'react'
import PageLayout from '../../src/client/components/PageLayout'
import ThemeContext from '../../src/client/context/ThemeContext'
import LoginForm from '../../src/client/components/LoginForm'
import styles from '../../styles/Login.module.css'

export default function New() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryBGColor } = appTheme

  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Create New Author</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={styles.container}
        style={{ backgroundColor: primaryBGColor }}
      ></main>
    </PageLayout>
  )
}
