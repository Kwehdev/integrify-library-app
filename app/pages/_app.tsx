import { useState } from 'react'
import ThemeContext, {
  DarkTheme,
  Themes,
} from '../src/client/context/ThemeContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [appTheme, setAppTheme] = useState(DarkTheme)

  const setCurrentTheme = (theme: Themes) => {
    setAppTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ appTheme, setCurrentTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  )
}

export default MyApp
