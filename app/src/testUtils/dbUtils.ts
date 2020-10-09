import { Types } from 'mongoose'
import User from '../server/models/User'
import { UserPayload, UserRole } from '../server/types'

export const createMockUser = async (role: UserRole) => {
  //Password is 'SuperSecretPassword1'
  return await User.create({
    username: `${role}User`,
    hash: '$2b$10$OhmjizZiTDgNQbTgX12yVOfGRZZHZHURKtYouUwAIjkkTskzK2oV6',
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
