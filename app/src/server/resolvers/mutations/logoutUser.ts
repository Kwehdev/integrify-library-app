import { NotAllowedError } from "../../helpers/apiError";
import { GQLMutation } from "../../types";
import { setCookie } from "../../utils/cookieUtils";

const logoutUser: GQLMutation = async (_parent, _args, _context) => {
  if (!_context.req.user) {
    throw new NotAllowedError(
      "You cannot perform this action while logged out."
    );
  }

  //Replace cookie with an expired cookie.
  await setCookie(_context, undefined);
  return "Successfully logged out.";
};

export default logoutUser;
