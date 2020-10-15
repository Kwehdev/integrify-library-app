import { useRouter } from 'next/router'
import { useEffect } from 'react'
import User from '../../../server/models/User'
import Loading from '../../components/Loading'
import useAuth from '../../hooks/useAuth'

const UnauthorizedAccessRoutes = ['/users/register', '/users/login']
const UserAccessRoutes = []
const AdminAccessRoutes = ['/admin']

export default function ProtectRoutes({ children }) {
  const { push, pathname } = useRouter()
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  try {
    if (userHasPermission(isAuthenticated, isAdmin, pathname.toLowerCase())) {
      return children
    }
    push('/forbidden')
    return null
  } catch {
    window.location.assign('/forbidden')
    return null
  }
}

const userHasPermission = (isAuthenticated, isAdmin, pathname) => {
  if (
    (UnauthorizedAccessRoutes.includes(pathname) && isAuthenticated) ||
    (UserAccessRoutes.includes(pathname) && !isAuthenticated) ||
    (AdminAccessRoutes.includes(pathname) && !isAdmin)
  ) {
    return false
  }
  return true
}
