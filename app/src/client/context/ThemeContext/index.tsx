import { createContext, useEffect, useState } from 'react'

export const LIGHT = 'LIGHT'
export const DARK = 'DARK'

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(LIGHT)

  useEffect(() => {
    changeBodyClass(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((theme) => (theme === DARK ? LIGHT : DARK))
  }

  const value = {
    theme,
    toggleTheme,
    isDark: theme === DARK,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const changeBodyClass = (theme: string) => {
  const currentTheme = theme === DARK ? LIGHT : DARK
  if (document.body.classList.length === 0) {
    document.body.classList.add(theme)
  } else {
    document.body.classList.replace(currentTheme, theme)
  }
}
