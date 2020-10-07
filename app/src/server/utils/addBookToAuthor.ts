import { Schema } from "mongoose"
import { findAuthorById } from "../services/authorServices"

const addBookToAuthor = async (
  authorId: Schema.Types.ObjectId,
  bookId: Schema.Types.ObjectId
) => {
  const authorDoc = await findAuthorById(authorId)
  authorDoc.books.push(bookId)
  await authorDoc.save()
}

export default addBookToAuthor
