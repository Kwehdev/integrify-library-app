import { Types } from 'mongoose'
import { AuthorDocument } from '../models/Author'
import { findAuthorById } from '../services/authorServices'

const removeBookFromAuthors = async (
  bookId: Types.ObjectId,
  authorIds: AuthorDocument['_id'][]
) => {
  for (const _id of authorIds) {
    const authorDoc = await findAuthorById(_id)
    const newBooks = [...authorDoc.books].filter((_id) => !_id.equals(bookId))
    authorDoc.books = newBooks
    await authorDoc.save()
  }
}

export default removeBookFromAuthors
