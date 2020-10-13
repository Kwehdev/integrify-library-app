import { findUserById } from '../../services/userServices'
import { GQLMutation } from '../../types'

const getUserProfile: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req

  if (!user) {
    return undefined
  } else {
    const userDoc = await findUserById(user.userId)
    const { _id, username, role, firstName, lastName, email } = userDoc
    return {
      userId: _id,
      username,
      role,
      firstName,
      lastName,
      email,
    }
  }
}

export default getUserProfile
