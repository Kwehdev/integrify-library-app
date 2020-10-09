import bcrypt from 'bcrypt'

import {
  InvalidInputError,
  NotAllowedError,
  UnauthorizedError,
} from '../../helpers/apiError'
import {
  findUserById,
  findUserByIdAndUpdate,
} from '../../services/userServices'
import { GQLMutation } from '../../types'
import { areUpdateUserPasswordInputsValid } from '../../utils/inputValidation'

const updateUserPassword: GQLMutation = async (_parent, _args, _context) => {
  if (!_context.req.user) {
    throw new NotAllowedError(
      'You cannot perform this action while logged out.'
    )
  }

  const { userId, user } = JSON.parse(JSON.stringify(_args))

  const { oldPassword, newPassword, confirmNewPassword } = user

  //ADMIN role will bypass this check.
  if (_context.req.user.role !== 'ADMIN') {
    if (!_context.req.user.userId.equals(userId)) {
      throw new UnauthorizedError()
    }

    //Check old password is valid

    const userDoc = await findUserById(userId)

    const oldPasswordIsValid = await bcrypt.compare(oldPassword, userDoc.hash)

    if (!oldPasswordIsValid) {
      throw new UnauthorizedError('Invalid password')
    }
  }

  //Check inputs are valid.

  if (!areUpdateUserPasswordInputsValid(user)) {
    throw new InvalidInputError()
  }

  //Hash the user password before storage.
  const hash = await bcrypt.hash(newPassword, 10)

  //I do not want users to update their username in my app, therefore we only pass hash.
  await findUserByIdAndUpdate(userId, { hash })
  return 'Successfully updated User Password'
}

export default updateUserPassword
