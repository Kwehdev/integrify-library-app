import { createContext } from 'react'

export type Theme = {
  primaryBGColor: string
  secondaryBGColor: string
  primaryTextColor: string
  formColor: string
  formInputColor: string
}

export const DarkTheme: Theme = {
  primaryBGColor: '#282c34',
  secondaryBGColor: '#446dc0',
  primaryTextColor: '#F3E9DC',
  formColor: '#1B1D23',
  formInputColor: '#62697F',
}

export const LightTheme: Theme = {
  primaryBGColor: '#F4F4F6',
  secondaryBGColor: '#9999A1',
  primaryTextColor: '#000000',
  formColor: '#9999A1',
  formInputColor: '#D9DCD6',
}

const ThemeContext = createContext({
  appTheme: DarkTheme,
  setCurrentTheme: (theme: Theme) => {},
})

export default ThemeContext
