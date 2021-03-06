import { Types } from 'mongoose'

import { DatabaseError, DocumentNotFoundError } from '../helpers/apiError'
import Author, { AuthorObject } from '../models/Author'
import removeAuthorFromBooks from '../utils/removeAuthorFromBooks'

export const findAuthorsInDB = async (
  dbQuery: any = {},
  limitOfResults: number
) => {
  return await Author.find(dbQuery).limit(limitOfResults).exec()
}

export const createNewAuthorInDB = async (author: AuthorObject) => {
  try {
    const authorDoc = await Author.create(author)
    return authorDoc
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findAuthorById = async (authorId: Types.ObjectId) => {
  try {
    return await Author.findById(authorId).exec()
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findAuthorByName = async (authorName: string) => {
  const authorNameRegex = new RegExp(`${authorName}`, 'i')
  try {
    return await Author.findOne({ name: authorNameRegex }).exec()
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findAuthorByIdAndDelete = async (authorId: Types.ObjectId) => {
  try {
    const authorDoc = await Author.findByIdAndDelete(authorId).exec()
    if (!authorDoc) {
      throw new DocumentNotFoundError(`Author ${authorId} not found.`)
    }

    await removeAuthorFromBooks(authorDoc._id, authorDoc.books)

    return authorDoc
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}

export const findAuthorByIdAndUpdate = async (
  authorId: Types.ObjectId,
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
