import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext/AuthContext'

const UnAuthenticatedRoutes = ['/users/register', '/users/login']
const UserRoutes = []
const AdminRoutes = ['/admin', '/authors/new']

export default function RestrictRoutes({ children }) {
  const { loading, isAuthenticated, isAdmin } = useContext(AuthContext)
  const { pathname, events } = useRouter()

  useEffect(() => {
    //Return to / if a route is not accessible relative to authentication state
    const handleRouteChange = (url: string) => {
      if (
        (!loading && AdminRoutes.includes(url.toLowerCase()) && !isAdmin) ||
        (UserRoutes.includes(url.toLowerCase()) && !isAuthenticated) ||
        (UnAuthenticatedRoutes.includes(url.toLowerCase()) && isAuthenticated)
      ) {
        window.location.href = '/'
      }
    }

    //The same, but for initial path.
    if (
      (!loading && AdminRoutes.includes(pathname.toLowerCase()) && !isAdmin) ||
      (UserRoutes.includes(pathname.toLowerCase()) && !isAuthenticated) ||
      (UnAuthenticatedRoutes.includes(pathname.toLowerCase()) &&
        isAuthenticated)
    ) {
      window.location.href = '/'
    }

    events.on('routeChangeStart', handleRouteChange)

    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [pathname, isAdmin, isAuthenticated])

  return children
}
