import bcrypt from 'bcrypt'

import {
  ConflictError,
  InvalidInputError,
  NotAllowedError,
} from '../../helpers/apiError'
import {
  createNewUserInDB,
  findUserByEmail,
  findUserByUsername,
} from '../../services/userServices'
import { GQLMutation, UserPayload, UserRole } from '../../types'
import { setCookie } from '../../utils/cookieUtils'
import { areUserInputsValid } from '../../utils/inputValidation'

const registerUser: GQLMutation = async (_parent, _args, _context) => {
  if (_context.req.user) {
    throw new NotAllowedError('You cannot perform this action while logged in.')
  }
  const { user } = JSON.parse(JSON.stringify(_args))

  if (!areUserInputsValid(user)) {
    throw new InvalidInputError()
  }

  //User also has confirmPassword, but we don't need it since it has been validated.
  const { username, password, email, firstName, lastName } = user

  if (await findUserByUsername(username)) {
    throw new ConflictError('This username is already in use.')
  }

  if (await findUserByEmail(email)) {
    throw new ConflictError('This email is already in use.')
  }

  //Hash the user password before storage.
  const hash = await bcrypt.hash(password, 10)

  //Assign the user role, giving them ADMIN if their name matches that in DB.
  const role: UserRole =
    username.toLocaleLowerCase() === process.env.ADMIN_NAME.toLocaleLowerCase()
      ? 'ADMIN'
      : 'USER'

  //Create User Document.
  const userDoc = await createNewUserInDB({
    username,
    hash,
    email,
    firstName,
    lastName,
    role,
    books: [],
  })

  //Assign the properties we want to an object we can use to generate a token & cookie.
  const userPayload: UserPayload = {
    userId: userDoc._id,
    username: userDoc.username,
    role: userDoc.role,
  }
  await setCookie(userPayload, _context)
  return 'Successfully signed in.'
}

export default registerUser
