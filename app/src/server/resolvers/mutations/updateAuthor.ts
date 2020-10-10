import { ForbiddenError } from 'apollo-server-micro'
import { findAuthorByIdAndUpdate } from '../../services/authorServices'
import { GQLMutation } from '../../types'

const updateAuthor: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req
  //Ensure user is logged in and is ADMIN.
  if (!user || user.role !== 'ADMIN') {
    throw new ForbiddenError('Access Denied')
  }

  const { authorId, author } = JSON.parse(JSON.stringify(_args))

  return await findAuthorByIdAndUpdate(authorId, author)
}

export default updateAuthor
