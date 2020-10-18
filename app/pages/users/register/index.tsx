import Head from 'next/head'
import React from 'react'
import RegistrationForm from '../../../src/client/components/RegistrationForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'

import styles from '../../../styles/RegisterPage.module.css'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Register</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <RegistrationForm />
        </div>
      </main>
    </>
  )
}

RegisterPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)
