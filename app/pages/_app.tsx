import request, { gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import ThemeContext, {
  DarkTheme,
  Themes,
} from '../src/client/context/ThemeContext'
import UserContext, { UserProfile } from '../src/client/context/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [appTheme, setAppTheme] = useState(DarkTheme)
  const [user, setUser] = useState(undefined)

  const setCurrentTheme = (theme: Themes) => {
    setAppTheme(theme)
  }

  const setCurrentUser = (user: UserProfile) => {
    setUser(user)
  }

  useEffect(() => {
    if (user) return
    const query = gql`
      {
        getUserProfile {
          userId
          username
          role
          firstName
          lastName
          email
        }
      }
    `

    request('/api/v1/graphql', query).then((res) => {
      setCurrentUser(res.getUserProfile)
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ appTheme, setCurrentTheme }}>
      <UserContext.Provider value={{ user, setCurrentUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default MyApp
