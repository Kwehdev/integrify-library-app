import React from 'react'
import { Provider } from 'react-redux'
import { AuthProvider } from '../src/client/context/AuthContext'

import { ThemeProvider } from '../src/client/context/ThemeContext'
import ProtectRoutes from '../src/client/hoc/ProtectRoutes/ProtectRoutes'
import SiteLayout from '../src/client/hoc/SiteLayout'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { withCustomLayout } = Component

  return (
    <ThemeProvider>
      <AuthProvider>
        <ProtectRoutes>
          {withCustomLayout ? (
            withCustomLayout(<Component {...pageProps} />)
          ) : (
            <SiteLayout>
              <Component {...pageProps} />
            </SiteLayout>
          )}
        </ProtectRoutes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
