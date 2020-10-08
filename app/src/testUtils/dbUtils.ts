import { Types } from 'mongoose'
import User from '../server/models/User'
import { UserPayload, UserRole } from '../server/types'

export const createMockUser = async (role: UserRole) => {
  return await User.create({
    username: `${role}User`,
    hash: 'Hash',
    firstName: 'FirstName',
    lastName: 'LastName',
    email: `${role}@domain.com`,
    role,
    books: [],
  })
}

export const getMockUser = (
  userId: Types.ObjectId,
  role: UserRole
): UserPayload => ({
  userId: userId,
  username: 'APIUser',
  role,
})
