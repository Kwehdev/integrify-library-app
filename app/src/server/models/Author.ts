import mongoose, { Document, Schema } from "mongoose"
import removeAuthorFromBook from "../utils/removeAuthorFromBook"
import { BookDocument } from "./Book"

export type AuthorObject = {
  name: string
  books: BookDocument["_id"][]
}

export type AuthorDocument = Document & AuthorObject

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
  ],
})

authorSchema.post<AuthorDocument>("findOneAndDelete", async (doc) => {
  if (doc) {
    for await (const book of doc.books) {
      await removeAuthorFromBook(doc._id, book._id)
    }
  }
})

// //Export Model if already created, if not, define it.
export default (mongoose.models.Author as mongoose.Model<AuthorDocument>) ||
  mongoose.model<AuthorDocument>("Author", authorSchema)
