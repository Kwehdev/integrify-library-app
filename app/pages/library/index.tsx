import Head from 'next/head'
import React from 'react'

import LibraryDisplay from '../../src/client/components/LibraryDisplay'

import styles from '../../styles/LibraryPage.module.css'

export default function LibraryPage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Library</title>
      </Head>
      <main>
        <div className={styles.container}>
          <LibraryDisplay />
        </div>
      </main>
    </>
  )
}
