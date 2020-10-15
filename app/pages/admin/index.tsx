import Head from 'next/head'
import React, { useContext } from 'react'
import PageLayout from '../../src/client/components/PageLayout'
import ThemeContext from '../../src/client/context/ThemeContext'

export default function AdminDashboard() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryBGColor } = appTheme

  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Admin Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main style={{ backgroundColor: primaryBGColor }}></main>
    </PageLayout>
  )
}
