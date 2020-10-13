import request, { gql } from 'graphql-request'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

type UserProfile = {
  userId: string
  username: string
  role: string
  firstName: string
  lastName: string
  email: string
}

export const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserProfile | undefined>(undefined)

  const reAuthenticate = useCallback(async () => {
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
    const { getUserProfile } = await request('/api/v1/graphql', query)
    setUser(getUserProfile)
  }, [])

  useEffect(() => {
    if (user) return
    reAuthenticate()
  }, [reAuthenticate, user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      reAuthenticate,
    }),
    [user, reAuthenticate]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
