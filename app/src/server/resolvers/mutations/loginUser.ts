import bcrypt from 'bcrypt';

import {
  DocumentNotFoundError,
  InvalidInputError,
  NotAllowedError,
} from '../../helpers/apiError';
import { findUserByUsername } from '../../services/userServices';
import { GQLMutation, UserPayload } from '../../types';
import { setCookie } from '../../utils/cookieUtils';
import { areLoginUserInputsValid } from '../../utils/inputValidation';

const loginUser: GQLMutation = async (_parent, _args, _context) => {
  if (_context.req.user) {
    throw new NotAllowedError(
      'You cannot perform this action while logged in.'
    );
  }

  const { user } = JSON.parse(JSON.stringify(_args));

  if (!areLoginUserInputsValid(user)) {
    throw new InvalidInputError();
  }

  const { username, password } = user;

  //Check username exists
  const userDoc = await findUserByUsername(username);

  //We should not tell our user whether it was the user or pass that was incorrect.
  if (!userDoc) {
    throw new DocumentNotFoundError('Invalid username or password');
  }

  //Check password is valid.
  const passwordIsValid = await bcrypt.compare(password, userDoc.hash);

  if (!passwordIsValid) {
    throw new DocumentNotFoundError('Invalid username or password');
  }

  //Assign the properties we want to an object we can use to generate a token & cookie.
  const userPayload: UserPayload = {
    userId: userDoc._id,
    username: userDoc.username,
    role: userDoc.role,
  };
  await setCookie(userPayload, _context);
  return 'Successfully signed in.';
};

export default loginUser;
