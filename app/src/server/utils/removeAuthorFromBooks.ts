import { Types } from 'mongoose'
import { BookDocument } from '../models/Book'
import { findBookById, findBookByIdAndDelete } from '../services/bookServices'

const removeAuthorFromBooks = async (
  authorId: Types.ObjectId,
  bookIds: BookDocument['_id'][]
) => {
  for (const _id of bookIds) {
    const bookDoc = await findBookById(_id)
    const newAuthors = [...bookDoc.authors].filter(
      (_id) => !_id.equals(authorId)
    )
    if (newAuthors.length === 0) {
      await findBookByIdAndDelete(_id, true)
    } else {
      bookDoc.authors = newAuthors
      await bookDoc.save()
    }
  }
}

export default removeAuthorFromBooks
