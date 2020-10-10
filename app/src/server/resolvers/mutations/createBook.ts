import { ForbiddenError } from 'apollo-server-micro'
import { createNewBookInDB } from '../../services/bookServices'
import { GQLMutation } from '../../types'

const createBook: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req
  //Ensure user is logged in and is ADMIN.
  if (!user || user.role !== 'ADMIN') {
    throw new ForbiddenError('Access Denied')
  }

  const { book } = JSON.parse(JSON.stringify(_args))
  return await createNewBookInDB(book)
}

export default createBook
