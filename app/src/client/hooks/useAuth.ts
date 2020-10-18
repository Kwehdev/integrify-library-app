import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error("'useAuth was called outside of a AuthContextProvider")
  }

  return ctx
}
