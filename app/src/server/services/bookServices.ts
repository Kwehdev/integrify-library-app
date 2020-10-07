import { Schema } from "mongoose"

import { DatabaseError, DocumentNotFoundError } from "../helpers/apiError"
import Book, { BookObject } from "../models/Book"

export const createNewBookInDB = async (book: BookObject) => {
  try {
    const bookDoc = await Book.create(book)
    if (!bookDoc) {
      throw new DatabaseError(`Failed to create ${book.title} in database.`)
    }
    return bookDoc
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findBookById = async (bookId: Schema.Types.ObjectId) => {
  try {
    const bookDoc = await Book.findById(bookId).exec()
    if (!bookDoc) {
      throw new DocumentNotFoundError(`Book ${bookId} not found.`)
    }
    return bookDoc
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}

export const findBookByIdAndDelete = async (bookId: Schema.Types.ObjectId) => {
  try {
    const bookDoc = await Book.findByIdAndDelete(bookId).exec()
    if (!bookDoc) {
      throw new DocumentNotFoundError(`Book ${bookId} not found.`)
    }
    return bookDoc
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}

export const findBookByIdAndUpdate = async (
  bookId: Schema.Types.ObjectId,
  updatedBook: Partial<BookObject>
) => {
  try {
    const bookDoc = await Book.findById(bookId).exec()
    if (!bookDoc) {
      throw new DocumentNotFoundError(`Book ${bookId} not found.`)
    }
    // Create a new document using ES6 Spread syntax.
    const newDocument = { ...bookDoc.toObject(), ...updatedBook }
    return await Book.findByIdAndUpdate(bookId, newDocument).exec()
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}
