import Head from 'next/head'
import React, { useContext } from 'react'
import PageLayout from '../../src/client/components/PageLayout'
import RegistrationForm from '../../src/client/components/RegistrationForm'
import ThemeContext from '../../src/client/context/ThemeContext'

import styles from '../../styles/Register.module.css'

export default function Register() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryBGColor } = appTheme

  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Register</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={styles.container}
        style={{ backgroundColor: primaryBGColor }}
      >
        <RegistrationForm />
      </main>
    </PageLayout>
  )
}
