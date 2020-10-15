import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { AuthProvider } from '../src/client/context/AuthContext/AuthContext'
import ThemeContext, {
  DarkTheme,
  Theme,
} from '../src/client/context/ThemeContext'
import ProtectRoutes from '../src/client/hoc/ProtectRoutes'
import store from '../src/client/redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [appTheme, setAppTheme] = useState(DarkTheme)

  const setCurrentTheme = (theme: Theme) => {
    setAppTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ appTheme, setCurrentTheme }}>
      <Provider store={store}>
        <AuthProvider>
          <ProtectRoutes>
            <Component {...pageProps} />
          </ProtectRoutes>
        </AuthProvider>
      </Provider>
    </ThemeContext.Provider>
  )
}

export default MyApp
