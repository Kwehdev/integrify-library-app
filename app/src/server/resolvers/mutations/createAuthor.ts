import { ForbiddenError } from 'apollo-server-micro'
import { createNewAuthorInDB } from '../../services/authorServices'
import { GQLMutation } from '../../types'

const createAuthor: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req
  //Ensure user is logged in and is ADMIN.
  if (!user || user.role !== 'ADMIN') {
    throw new ForbiddenError('Access Denied')
  }

  const { author } = JSON.parse(JSON.stringify(_args))
  return await createNewAuthorInDB(author)
}

export default createAuthor
