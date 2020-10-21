import Head from 'next/head'
import React from 'react'
import AuthorDeleteForm from '../../../src/client/components/DeleteAuthorForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'
import { connectToDatabase } from '../../../src/server/helpers/database'
import { findAuthorsInDB } from '../../../src/server/services/authorServices'

import styles from '../../../styles/DeleteAuthorPage.module.css'

export default function DeleteAuthorPage({ data }) {
  const authors = JSON.parse(data)
  return (
    <>
      <Head>
        <title>LibraryApp - Author Deletion</title>
      </Head>
      <main className={styles.container}>
        <AuthorDeleteForm authors={authors} />
      </main>
    </>
  )
}

DeleteAuthorPage.withCustomLayout = (page) => (
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
