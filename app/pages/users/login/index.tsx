import Head from 'next/head'
import React from 'react'
import LoginForm from '../../../src/client/components/LoginForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'

import styles from '../../../styles/LoginPage.module.css'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Login</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <LoginForm />
        </div>
      </main>
    </>
  )
}

LoginPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)
