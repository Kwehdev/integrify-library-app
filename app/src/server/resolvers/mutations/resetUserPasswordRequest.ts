import { randomBytes } from 'crypto'

import { NotAllowedError } from '../../helpers/apiError'
import { findUserByEmail } from '../../services/userServices'
import { GQLMutation } from '../../types'
import {
  constructPasswordRequestEmail,
  sendEmail,
} from '../../utils/emailUtils'

const resetUserPasswordRequest: GQLMutation = async (
  _parent,
  _args,
  _context
) => {
  if (_context.req.user) {
    throw new NotAllowedError('You cannot perform this action while logged in.')
  }

  const { email } = JSON.parse(JSON.stringify(_args))

  const userDoc = await findUserByEmail(email)

  //Don't tell the user that we haven't found anyone.
  if (!userDoc)
    return 'If we find a user for that email address, we will send you an email shortly.'

  const resetToken = randomBytes(20).toString('hex')
  const resetTokenExpiry = Date.now() + 86400000

  //Assign values to user in DB.
  userDoc.resetToken = resetToken
  userDoc.resetTokenExpiry = resetTokenExpiry
  await userDoc.save()

  await sendEmail(
    constructPasswordRequestEmail(
      userDoc.firstName,
      userDoc.email,
      resetToken,
      resetTokenExpiry
    )
  )

  return 'If we find a user for that email address, we will send you an email shortly.'
}

export default resetUserPasswordRequest
