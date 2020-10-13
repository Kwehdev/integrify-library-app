import React, { useState } from 'react'
import ThemeContext, {
  DarkTheme,
  Themes,
} from '../src/client/context/ThemeContext'
import { UserProvider } from '../src/client/context/UserContext/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [appTheme, setAppTheme] = useState(DarkTheme)

  const setCurrentTheme = (theme: Themes) => {
    setAppTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ appTheme, setCurrentTheme }}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeContext.Provider>
  )
}

export default MyApp
