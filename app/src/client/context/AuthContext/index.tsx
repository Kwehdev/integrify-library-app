import request, { gql } from 'graphql-request'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

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

  const login = useCallback(async (user) => {
    const query = gql`
      mutation LoginUser($user: UserLoginInput) {
        loginUser(user: $user)
      }
    `

    const variables = {
      user,
    }

    await request('/api/v1/graphql', query, variables)
  }, [])

  const register = useCallback(async (user) => {
    const query = gql`
      mutation RegisterUser($user: UserRegisterInput) {
        registerUser(user: $user)
      }
    `

    const variables = {
      user,
    }

    await request('/api/v1/graphql', query, variables)
  }, [])

  const logout = useCallback(async () => {
    const query = gql`
      mutation LogoutUser {
        logoutUser
      }
    `

    await request('/api/v1/graphql', query)
    setUser(undefined)
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
      login,
      logout,
      register,
    }),
    [user, reAuthenticate, logout, register]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
