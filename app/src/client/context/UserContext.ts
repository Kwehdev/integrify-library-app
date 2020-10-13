import { createContext } from 'react'

export type UserProfile = {
  userId: string
  username: string
  role: string
  firstName: string
  lastName: string
}

const UserContext = createContext({
  user: undefined,
  setCurrentUser: (user: UserProfile) => {},
})

export default UserContext
