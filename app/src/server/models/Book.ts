import mongoose, { Document, Schema } from "mongoose"
import { findBookById } from "../services/bookServices"
import { BookGenre, BookStatus } from "../types"
import addBookToAuthor from "../utils/addBookToAuthor"
import removeBookFromAuthor from "../utils/removeBookFromAuthor"
import { AuthorDocument } from "./Author"

export type BookObject = {
  ISBN: string
  imageURI: string
  title: string
  description: string
  status: BookStatus
  authors: AuthorDocument["_id"][]
  publisher: string
  publishedDate: string
  genre: BookGenre[]
  borrowedBy?: Schema.Types.ObjectId
  borrowDate?: string
  dueDate?: string
}

export type BookDocument = Document & BookObject

const bookSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageURI: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
  ],
  publisher: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  borrowedBy: Schema.Types.ObjectId,
  borrowDate: String,
  dueDate: String,
})

bookSchema.post<BookDocument>("save", async (doc) => {
  if (doc) {
    for await (const author of doc.authors) {
      await addBookToAuthor(author._id, doc._id)
    }
  }
})

bookSchema.post<BookDocument>("findOneAndUpdate", async (doc) => {
  if (doc) {
    for await (const author of doc.authors) {
      //Remove book from all authors. This is necessary incase book ID was changed.
      await removeBookFromAuthor(author._id, doc._id)
    }
    const updatedDoc = await findBookById(doc._id)
    for await (const author of updatedDoc.authors) {
      //Add book to all authors in the updated document.
      await addBookToAuthor(author._id, doc._id)
    }
  }
})

// //Export Model if already created, if not, define it.
export default (mongoose.models.Book as mongoose.Model<BookDocument>) ||
  mongoose.model<BookDocument>("Book", bookSchema)
