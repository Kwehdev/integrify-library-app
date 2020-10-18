import Head from 'next/head'
import React from 'react'
import Jumbotron from '../src/client/components/Jumbotron'

import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Home</title>
      </Head>
      <main>
        <div className={styles.container}>
          <Jumbotron />
        </div>
      </main>
    </>
  )
}
