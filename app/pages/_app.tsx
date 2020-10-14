import React, { useState } from 'react'
import { Provider } from 'react-redux'
import ThemeContext, {
  DarkTheme,
  Theme,
} from '../src/client/context/ThemeContext'
import { UserProvider } from '../src/client/context/UserContext/UserContext'
import store from '../src/client/redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [appTheme, setAppTheme] = useState(DarkTheme)

  const setCurrentTheme = (theme: Theme) => {
    setAppTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ appTheme, setCurrentTheme }}>
      <UserProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </UserProvider>
    </ThemeContext.Provider>
  )
}

export default MyApp
