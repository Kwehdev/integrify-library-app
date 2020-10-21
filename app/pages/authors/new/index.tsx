import Head from 'next/head'
import React from 'react'
import AuthorCreationForm from '../../../src/client/components/AuthorCreationForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'

import styles from '../../../styles/NewAuthorPage.module.css'

export default function NewAuthorPage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Author Creation</title>
      </Head>
      <main className={styles.container}>
        <AuthorCreationForm />
      </main>
    </>
  )
}

NewAuthorPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)
