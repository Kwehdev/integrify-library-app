import { Schema } from "mongoose"
import { findBookById, findBookByIdAndDelete } from "../services/bookServices"

const removeAuthorFromBook = async (
  authorId: Schema.Types.ObjectId,
  bookId: Schema.Types.ObjectId
) => {
  const bookDoc = await findBookById(bookId)
  //Create a new array, filtering out authorId;
  const newAuthors = bookDoc.authors.filter(
    (author) => !author._id.equals(authorId)
  )

  //If no authors exist anymore, delete the book
  if (newAuthors.length === 0) {
    return await findBookByIdAndDelete(bookId)
  }
  //
  bookDoc.authors = newAuthors
  return await bookDoc.save()
}

export default removeAuthorFromBook
