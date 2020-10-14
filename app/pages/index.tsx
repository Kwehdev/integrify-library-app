import Head from 'next/head'
import React from 'react'
import JumboTron from '../src/client/components/JumboTron'

import PageLayout from '../src/client/components/PageLayout'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.container}>
        <JumboTron />
      </main>
    </PageLayout>
  )
}
