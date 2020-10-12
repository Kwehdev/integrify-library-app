import { createContext } from 'react'

export type Themes = {
  navBGColor: string
  navTextColor: string
}

export const DarkTheme: Themes = {
  navBGColor: '#282c34',
  navTextColor: '#fafafa',
}

const ThemeContext = createContext({
  appTheme: DarkTheme,
  setCurrentTheme: (theme: Themes) => {},
})

export default ThemeContext
