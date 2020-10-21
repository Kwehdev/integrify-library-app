import Head from 'next/head'
import React from 'react'
import DeleteBookForm from '../../../src/client/components/DeleteBookForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'
import { connectToDatabase } from '../../../src/server/helpers/database'
import { findBooksInDB } from '../../../src/server/services/bookServices'

import styles from '../../../styles/DeleteBookPage.module.css'

export default function DeleteBookPage({ data }) {
  const books = JSON.parse(data)
  return (
    <>
      <Head>
        <title>LibraryApp - Book Deletion</title>
      </Head>
      <main className={styles.container}>
        <DeleteBookForm books={books} />
      </main>
    </>
  )
}

DeleteBookPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)

export async function getStaticProps() {
  await connectToDatabase()
  const data = JSON.stringify(await findBooksInDB())
  return {
    props: {
      data,
    },
    revalidate: 180,
  }
}
