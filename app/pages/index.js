import Head from 'next/head'

import PageLayout from '../src/client/components/PageLayout'

export default function Home() {
  return (
    <PageLayout>
      <Head>
        <title>LibraryApp - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </PageLayout>
  )
}
