import { AuthenticationError } from 'apollo-server-micro'
import { ConflictError, DocumentNotFoundError } from '../../helpers/apiError'
import { findBookById } from '../../services/bookServices'
import { findUserById } from '../../services/userServices'
import { GQLMutation } from '../../types'

const borrowBook: GQLMutation = async (_parent, _args, _context) => {
  const { user } = _context.req
  //Ensure user is logged in
  if (!user) {
    throw new AuthenticationError(
      'You must be logged in to perform this action.'
    )
  }

  const { bookId } = JSON.parse(JSON.stringify(_args))

  const userDoc = await findUserById(user.userId)

  // Should only occur if a user is manually deleted. Should never happen.
  if (!userDoc) {
    throw new DocumentNotFoundError(
      `No user was found for user ID ${user.userId}`
    )
  }

  const bookDoc = await findBookById(bookId)

  if (!bookDoc) {
    throw new DocumentNotFoundError(`No book was found for book ID ${bookDoc}`)
  }

  if (bookDoc.status === 'Unavailable') {
    return new ConflictError('This book is currently lent out.')
  }

  //Assign the book to the user.
  userDoc.books.push(bookDoc._id)
  await userDoc.save()

  bookDoc.status = 'Unavailable'
  bookDoc.borrowedBy = user.userId

  //Set borrowed date & due date.
  const date = new Date()
  bookDoc.borrowDate = date.toISOString().split('T')[0]
  date.setDate(date.getDate() + 30)
  bookDoc.dueDate = date.toISOString().split('T')[0]

  return await bookDoc.save()
}

export default borrowBook
