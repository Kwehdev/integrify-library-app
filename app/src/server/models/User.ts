import mongoose, { Document, Schema } from 'mongoose'
import { UserRole } from '../types'
import { BookDocument } from './Book'

export type UserObject = {
  username: string
  hash: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  books: BookDocument['_id'][]
  resetToken?: string
  resetTokenExpiry?: number
}

export type UserDocument = Document & UserObject

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  resetToken: String,
  resetTokenExpiry: Number,
})

//Export Model if already created, if not, define it.
export default (mongoose.models.User as mongoose.Model<UserDocument>) ||
  mongoose.model<UserDocument>('User', userSchema)
