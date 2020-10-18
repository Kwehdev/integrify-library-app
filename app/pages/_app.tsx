import React from 'react'
import { Provider } from 'react-redux'

import { ThemeProvider } from '../src/client/context/ThemeContext'
import SiteLayout from '../src/client/hoc/SiteLayout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { withCustomLayout } = Component

  return (
    <ThemeProvider>
      {withCustomLayout ? (
        withCustomLayout(<Component {...pageProps} />)
      ) : (
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      )}
    </ThemeProvider>
  )
}

export default MyApp
