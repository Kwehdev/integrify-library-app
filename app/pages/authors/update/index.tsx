import Head from 'next/head'
import React from 'react'
import AuthorUpdateForm from '../../../src/client/components/UpdateAuthorForm'
import CenteredLayout from '../../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../../src/client/hoc/SiteLayout'
import { connectToDatabase } from '../../../src/server/helpers/database'
import { findAuthorsInDB } from '../../../src/server/services/authorServices'

import styles from '../../../styles/UpdateAuthorPage.module.css'

export default function UpdateAuthorPage({ data }) {
  const authors = JSON.parse(data)
  return (
    <>
      <Head>
        <title>LibraryApp - Author Update</title>
      </Head>
      <main className={styles.container}>
        <AuthorUpdateForm authors={authors} />
      </main>
    </>
  )
}

UpdateAuthorPage.withCustomLayout = (page) => (
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
