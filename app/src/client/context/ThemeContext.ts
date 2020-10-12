import { createContext } from 'react'

export type Themes = {
  primaryBGColor: string
  secondaryBGColor: string
  primaryTextColor: string
  formColor: string
  formInputColor: string
}

export const DarkTheme: Themes = {
  primaryBGColor: '#282c34',
  secondaryBGColor: '#5AB1BB',
  primaryTextColor: '#F3E9DC',
  formColor: '#1B1D23',
  formInputColor: '#62697F',
}

const ThemeContext = createContext({
  appTheme: DarkTheme,
  setCurrentTheme: (theme: Themes) => {},
})

export default ThemeContext
