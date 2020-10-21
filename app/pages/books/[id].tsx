import Head from 'next/head'
import React from 'react'
import Book from '../../src/client/components/Book'
import CenteredLayout from '../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../src/client/hoc/SiteLayout'
import { connectToDatabase } from '../../src/server/helpers/database'
import {
  findBookById,
  findBooksInDB,
} from '../../src/server/services/bookServices'

import styles from '../../styles/BookPage.module.css'

export default function BookPage({ data }) {
  const book = JSON.parse(data)
  return (
    <>
      <Head>
        <title>LibraryApp - {book.title}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Book {...book} />
        </div>
      </main>
    </>
  )
}

BookPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)

export async function getStaticPaths() {
  await connectToDatabase()
  const data = await findBooksInDB()
  const paths = data.map(({ _id }) => ({
    params: { id: _id.toString() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params: { id } }) {
  await connectToDatabase()
  const data = JSON.stringify(await findBookById(id))
  return {
    props: {
      data,
    },
  }
}
