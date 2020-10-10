import { ForbiddenError } from 'apollo-server-micro'
import { findBookByIdAndUpdate } from '../../services/bookServices'
import { GQLMutation } from '../../types'

const updateBook: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req
  //Ensure user is logged in and is ADMIN.
  if (!user || user.role !== 'ADMIN') {
    throw new ForbiddenError('Access Denied')
  }

  const { bookId, book } = JSON.parse(JSON.stringify(_args))
  return await findBookByIdAndUpdate(bookId, book)
}

export default updateBook
