import request, { gql } from 'graphql-request'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

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
    if (getUserProfile) {
      return setUser(getUserProfile)
    }
    return setUser(undefined)
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
      isAdmin: user && user.role === 'ADMIN',
      loading: user === null,
    }),
    [user, reAuthenticate]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
