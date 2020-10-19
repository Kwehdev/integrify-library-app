import Head from 'next/head'
import React from 'react'

import styles from '../../styles/ForbiddenPage.module.css'

export default function ForbiddenPage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Library</title>
      </Head>
      <main>
        <div className={styles.container}></div>
      </main>
    </>
  )
}
