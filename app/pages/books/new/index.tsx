import request, { gql } from 'graphql-request'
import Head from 'next/head'
import React, { useContext } from 'react'
import CreateBookForm from '../../../src/client/components/CreateBookForm'
import PageLayout from '../../../src/client/components/PageLayout'
import ThemeContext from '../../../src/client/context/ThemeContext'
import { findAuthorsInDB } from '../../../src/server/services/authorServices'
import styles from '../../../styles/NewBook.module.css'

export default function NewBook({ authors }) {
  const { appTheme } = useContext(ThemeContext)
  const { primaryBGColor } = appTheme

  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Create New Book</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={styles.container}
        style={{ backgroundColor: primaryBGColor }}
      >
        {authors.length === 0 ? (
          <p>
            No Authors exist in Database. Please add some before proceeding.
          </p>
        ) : (
          <CreateBookForm authors={authors} />
        )}
      </main>
    </PageLayout>
  )
}

export async function getStaticProps({ req }) {
  const authors = JSON.stringify(await findAuthorsInDB({}, 0))
  return {
    props: {
      authors,
    },
  }
}
