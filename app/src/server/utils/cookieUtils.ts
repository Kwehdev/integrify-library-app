import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

import { GQLContext, UserPayload } from '../types';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

export const setCookie = async (
  _context: GQLContext,
  userPayload?: UserPayload
) => {
  if (userPayload) {
    const token = getToken(userPayload);

    //Set Token as a httpOnly Cookie
    _context.res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        httpOnly: true,
        maxAge: parseInt(process.env.TOKEN_EXPIRY_TIME),
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      })
    );
  } else {
    //Set a dead cookie
    _context.res.setHeader(
      'Set-Cookie',
      serialize('token', '', {
        httpOnly: true,
        maxAge: -1,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      })
    );
  }
};

const getToken = (userPayload: UserPayload) => {
  //Get a signed JWT Token
  return jwt.sign(userPayload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY_TIME,
  });
};

export const getPayloadFromCookie = (cookies: NextApiRequestCookies) => {
  if (!cookies) {
    return undefined;
  }

  try {
    const decoded = jwt.verify(cookies.token, process.env.JWT_PRIVATE_KEY);
    return decoded as UserPayload;
  } catch (err) {
    return undefined;
  }
};
