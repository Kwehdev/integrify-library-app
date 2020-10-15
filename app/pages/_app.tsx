import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { AuthProvider } from '../src/client/context/AuthContext/AuthContext'
import ThemeContext, {
  DarkTheme,
  Theme,
} from '../src/client/context/ThemeContext'
import RestrictRoutes from '../src/client/hoc/RestrictRoutes'
import store from '../src/client/redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [appTheme, setAppTheme] = useState(DarkTheme)

  const setCurrentTheme = (theme: Theme) => {
    setAppTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ appTheme, setCurrentTheme }}>
      <AuthProvider>
        <RestrictRoutes>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </RestrictRoutes>
      </AuthProvider>
    </ThemeContext.Provider>
  )
}

export default MyApp
