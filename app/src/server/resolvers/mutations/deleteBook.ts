import { ForbiddenError } from 'apollo-server-micro'
import { findBookByIdAndDelete } from '../../services/bookServices'
import { GQLMutation } from '../../types'

const deleteBook: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req
  //Ensure user is logged in and is ADMIN.
  if (!user || user.role !== 'ADMIN') {
    throw new ForbiddenError('Access Denied')
  }

  const { bookId } = JSON.parse(JSON.stringify(_args))
  return await findBookByIdAndDelete(bookId)
}

export default deleteBook
