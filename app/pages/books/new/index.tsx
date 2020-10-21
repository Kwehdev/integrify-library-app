import Head from 'next/head'
import React from 'react'
import BookCreationForm from '../../../src/client/components/BookCreationForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'
import { connectToDatabase } from '../../../src/server/helpers/database'
import { findAuthorsInDB } from '../../../src/server/services/authorServices'

import styles from '../../../styles/NewBookPage.module.css'

export default function NewBookPage({ data }) {
  const authors = JSON.parse(data)
  return (
    <>
      <Head>
        <title>LibraryApp - Book Creation</title>
      </Head>
      <main className={styles.container}>
        <BookCreationForm authors={authors} />
      </main>
    </>
  )
}

NewBookPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)

export async function getStaticProps() {
  await connectToDatabase()
  const data = JSON.stringify(await findAuthorsInDB({}, 0))
  return {
    props: {
      data,
    },
    revalidate: 180,
  }
}
