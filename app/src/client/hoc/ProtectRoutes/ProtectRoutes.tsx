import { useRouter } from 'next/router'
import useAuth from '../../hooks/useAuth'

const UnauthorizedAccessRoutes = ['/users/register', '/users/login']
const UserAccessRoutes = []
const AdminAccessRoutes = ['/authors/new', '/books/new']

export default function ProtectRoutes({ children }) {
  const { push, pathname } = useRouter()
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return <> </>
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