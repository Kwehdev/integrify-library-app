import { Schema } from "mongoose"

import { DatabaseError, DocumentNotFoundError } from "../helpers/apiError"
import Author, { AuthorObject } from "../models/Author"

export const createNewAuthorInDB = async (author: AuthorObject) => {
  try {
    const authorDoc = await Author.create(author)
    if (!authorDoc) {
      throw new DatabaseError(`Failed to create ${author.name} in database.`)
    }
    return authorDoc
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findAuthorById = async (authorId: Schema.Types.ObjectId) => {
  try {
    const authorDoc = await Author.findById(authorId).exec()
    if (!authorDoc) {
      throw new DocumentNotFoundError(`Author ${authorId} not found.`)
    }
    return authorDoc
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}

export const findAuthorByIdAndDelete = async (
  authorId: Schema.Types.ObjectId
) => {
  try {
    const authorDoc = await Author.findByIdAndDelete(authorId).exec()
    if (!authorDoc) {
      throw new DocumentNotFoundError(`Author ${authorId} not found.`)
    }
    return authorDoc
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}

export const findAuthorByIdAndUpdate = async (
  authorId: Schema.Types.ObjectId,
  updatedAuthor: Partial<AuthorObject>
) => {
  try {
    const authorDoc = await Author.findById(authorId).exec()
    if (!authorDoc) {
      throw new DocumentNotFoundError(`Author ${authorId} not found.`)
    }
    // Create a new document using ES6 Spread syntax.
    const newDocument = { ...authorDoc.toObject(), ...updatedAuthor }
    return await Author.findByIdAndUpdate(authorId, newDocument).exec()
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}
