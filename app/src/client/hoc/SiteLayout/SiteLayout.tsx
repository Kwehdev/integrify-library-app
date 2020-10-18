import React from 'react'
import Head from 'next/head'

import Header from '../../components/Header'
import useTheme from '../../hooks/useTheme'
import styles from './SiteLayout.module.css'

export default function SiteLayout({ children }) {
  const { theme } = useTheme()
  return (
    <div className={styles.container}>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
