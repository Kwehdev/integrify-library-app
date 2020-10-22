import Head from 'next/head'
import React from 'react'
import UpdatePasswordForm from '../../src/client/components/UpdatePasswordForm'
import UpdateProfileForm from '../../src/client/components/UpdateProfileForm'
import CenteredLayout from '../../src/client/hoc/CenteredLayout'
import SiteLayout from '../../src/client/hoc/SiteLayout'

export default function UpdatePasswordPage() {
  return (
    <>
      <Head>
        <title>LibraryApp - Update Password</title>
      </Head>
      <main>
        <div>
          <UpdatePasswordForm />
        </div>
      </main>
    </>
  )
}

UpdatePasswordPage.withCustomLayout = (page) => (
  <SiteLayout>
    <CenteredLayout>{page}</CenteredLayout>
  </SiteLayout>
)
