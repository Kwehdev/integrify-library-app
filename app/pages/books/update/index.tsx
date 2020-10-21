import Head from 'next/head'
import React from 'react'
import BookCreationForm from '../../../src/client/components/BookCreationForm'
import UpdateBookForm from '../../../src/client/components/UpdateBookForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'
import { connectToDatabase } from '../../../src/server/helpers/database'
import { findAuthorsInDB } from '../../../src/server/services/authorServices'
import { findBooksInDB } from '../../../src/server/services/bookServices'

import styles from '../../../styles/UpdateBookPage.module.css'

export default function UpdateBookPage({ authorData, bookData }) {
  const authors = JSON.parse(authorData)
  const books = JSON.parse(bookData)

  return (
    <>
      <Head>
        <title>LibraryApp - Book Update</title>
      </Head>
      <main className={styles.container}>
        <UpdateBookForm authors={authors} books={books} />
      </main>
    </>
  )
}

UpdateBookPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)

export async function getStaticProps() {
  await connectToDatabase()
  const authorData = JSON.stringify(await findAuthorsInDB({}, 0))
  const bookData = JSON.stringify(await findBooksInDB())

  return {
    props: {
      authorData,
      bookData,
    },
    revalidate: 180,
  }
}
