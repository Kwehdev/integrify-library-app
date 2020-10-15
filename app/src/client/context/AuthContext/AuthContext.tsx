import request, { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const reAuthenticate = useCallback(async () => {
    try {
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
        setUser(getUserProfile)
      } else {
        setUser(undefined)
      }
    } catch {
      setUser(undefined)
    }
  }, [])

  useEffect(() => {
    if (user) return
    reAuthenticate()
  }, [reAuthenticate, user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user && user.role === 'ADMIN',
      isLoading: user === null,
      reAuthenticate,
    }),
    [user, reAuthenticate]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
