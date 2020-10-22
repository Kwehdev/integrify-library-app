import Head from 'next/head'
import React from 'react'
import ProfileDisplay from '../../src/client/components/ProfileDisplay'
import CenteredLayout from '../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../src/client/hoc/SiteLayout'

import styles from '../../styles/ProfilePage.module.css'

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Profile</title>
      </Head>
      <main>
        <div className={styles.container}>
          <ProfileDisplay />
        </div>
      </main>
    </>
  )
}

ProfilePage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)
