import { Schema } from "mongoose"
import { findAuthorById } from "../services/authorServices"

const removeBookFromAuthor = async (
  authorId: Schema.Types.ObjectId,
  bookId: Schema.Types.ObjectId
) => {
  const authorDoc = await findAuthorById(authorId)

  //Create a new array, filtering out bookId;
  const newBooks = authorDoc.books.filter((book) => !book._id.equals(bookId))

  authorDoc.books = newBooks
  await authorDoc.save()
}

export default removeBookFromAuthor
