import mongoose, { Document, Schema } from 'mongoose'
import { BookDocument } from './Book'

export type AuthorObject = {
  name: string
  books: BookDocument['_id'][]
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
      ref: 'Book',
    },
  ],
})

authorSchema.post('findOneAndUpdate', async (doc) => {
  return await doc.populate('books').execPopulate()
})

authorSchema.post('save', async (doc) => {
  return await doc.populate('books').execPopulate()
})

// //Export Model if already created, if not, define it.
export default (mongoose.models.Author as mongoose.Model<AuthorDocument>) ||
  mongoose.model<AuthorDocument>('Author', authorSchema)
