import {
  ConflictError,
  InvalidInputError,
  NotAllowedError,
  UnauthorizedError,
} from '../../helpers/apiError'
import { UserObject } from '../../models/User'
import {
  findUserByEmail,
  findUserByIdAndUpdate,
} from '../../services/userServices'
import { GQLMutation } from '../../types'
import { areUpdateUserProfileInputsValid } from '../../utils/inputValidation'

const updateUserProfile: GQLMutation = async (_parent, _args, _context) => {
  if (!_context.req.user) {
    throw new NotAllowedError(
      'You cannot perform this action while logged out.'
    )
  }

  const { userId, user } = JSON.parse(JSON.stringify(_args))

  //ADMIN role will bypass this check.
  if (_context.req.user.role !== 'ADMIN') {
    if (_context.req.user.userId !== userId) {
      throw new UnauthorizedError()
    }
  }

  const { email } = user

  //Check if email is taken. This will throw a conflict error if it is, ending this block.
  const userDoc = await findUserByEmail(email)
  if (userDoc && userDoc._id !== userId) {
    throw new ConflictError('That email is already in use.')
  }

  if (!areUpdateUserProfileInputsValid(user)) {
    throw new InvalidInputError()
  }

  await findUserByIdAndUpdate(userId, user)
  return 'Successfully updated User Profile'
}

export default updateUserProfile
