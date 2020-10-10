import { ForbiddenError } from 'apollo-server-micro'
import { findAuthorByIdAndDelete } from '../../services/authorServices'
import { GQLMutation } from '../../types'

const deleteAuthor: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req
  //Ensure user is logged in and is ADMIN.
  if (!user || user.role !== 'ADMIN') {
    throw new ForbiddenError('Access Denied')
  }

  const { authorId } = JSON.parse(JSON.stringify(_args))
  return await findAuthorByIdAndDelete(authorId)
}

export default deleteAuthor
