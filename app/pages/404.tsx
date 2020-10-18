import Head from 'next/head'
import React from 'react'

import styles from '../styles/404.module.css'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404: This page could not be found</title>
      </Head>
      <main>
        <div className={styles.container}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorMessage}>This page could not be found.</h2>
        </div>
      </main>
    </>
  )
}
