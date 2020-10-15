import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext/AuthContext'

export default function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error('useAuth must be called inside of an AuthContext Provider')
  }
  return ctx
}
