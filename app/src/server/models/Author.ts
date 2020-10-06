import mongoose, { Document } from "mongoose"

export type AuthorObject = {
  name: string
}

export type AuthorDocument = Document & AuthorObject

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

// //Export Model if already created, if not, define it.
export default (mongoose.models.Author as mongoose.Model<AuthorDocument>) ||
  mongoose.model<AuthorDocument>("Author", authorSchema)
