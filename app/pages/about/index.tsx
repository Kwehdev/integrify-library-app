import Head from 'next/head'
import React from 'react'

import styles from '../../styles/AboutPage.module.css'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>LibraryApp - About</title>
      </Head>
      <main>
        <div className={styles.container}></div>
      </main>
    </>
  )
}
