import Head from 'next/head'
import React from 'react'
import UpdateProfileForm from '../../src/client/components/UpdateProfileForm'
import CenteredLayout from '../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../src/client/hoc/SiteLayout'

import styles from '../../styles/UpdateProfilePage.module.css'

export default function UpdateProfilePage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Update Profile</title>
      </Head>
      <main>
        <div className={styles.container}>
          <UpdateProfileForm />
        </div>
      </main>
    </>
  )
}

UpdateProfilePage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)
