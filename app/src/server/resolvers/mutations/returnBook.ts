import { AuthenticationError } from 'apollo-server-micro'
import { DocumentNotFoundError } from '../../helpers/apiError'
import { findBookById } from '../../services/bookServices'
import { findUserById } from '../../services/userServices'
import { GQLMutation } from '../../types'

const returnBook: GQLMutation = async (_parent, _args, _context) => {
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

  if (!bookDoc.borrowedBy.equals(user.userId)) {
    throw new DocumentNotFoundError('You do not own this book.')
  }

  //Remove the book from the user.
  const newBooks = [...userDoc.books].filter((_id) => !_id.equals(bookId))
  userDoc.books = newBooks
  await userDoc.save()

  //Remove user from book.
  bookDoc.status = 'Available'
  bookDoc.borrowedBy = undefined
  bookDoc.borrowDate = undefined
  bookDoc.dueDate = undefined

  return await bookDoc.save()
}

export default returnBook
