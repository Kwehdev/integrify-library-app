import mongoose, { Document, Schema, Types } from 'mongoose'
import { BookGenre, BookStatus } from '../types'
import { AuthorDocument } from './Author'

export type BookObject = {
  ISBN: string
  imageURI: string
  title: string
  description: string
  status: BookStatus
  authors: AuthorDocument['_id'][]
  publisher: string
  publishedDate: string
  genre: BookGenre[]
  borrowedBy?: Types.ObjectId
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
      ref: 'Author',
    },
  ],
  genre: {
    type: [String],
    required: true,
  },
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

bookSchema.post('findOneAndUpdate', async (doc) => {
  return await doc.populate('authors').execPopulate()
})

bookSchema.post('save', async (doc) => {
  return await doc.populate('authors').execPopulate()
})

// //Export Model if already created, if not, define it.
export default (mongoose.models.Book as mongoose.Model<BookDocument>) ||
  mongoose.model<BookDocument>('Book', bookSchema)
