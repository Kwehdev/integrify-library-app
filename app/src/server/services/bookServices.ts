import { Types } from 'mongoose'
import { DatabaseError, DocumentNotFoundError } from '../helpers/apiError'
import Book, { BookObject } from '../models/Book'
import addBookToAuthors from '../utils/addBookToAuthors'
import removeBookFromAuthors from '../utils/removeBookFromAuthors'

export const createNewBookInDB = async (book: BookObject) => {
  try {
    const bookDoc = await Book.create(book)

    await addBookToAuthors(bookDoc._id, bookDoc.authors)

    return bookDoc
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findBooksInDB = async (
  dbQuery: any = {},
  limitOfResults: number
) => {
  return await Book.find(dbQuery).limit(limitOfResults).exec()
}

export const findBookById = async (bookId: Types.ObjectId) => {
  try {
    return await Book.findById(bookId).exec()
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findBookByIdAndDelete = async (
  bookId: Types.ObjectId,
  skipDeleteFromAuthors?: boolean
) => {
  try {
    const bookDoc = await Book.findByIdAndDelete(bookId).exec()
    if (!bookDoc) {
      throw new DocumentNotFoundError(`Book ${bookId} not found.`)
    }

    //Flag that can be set, if the author was already deleted.
    if (!skipDeleteFromAuthors) {
      //Remove this book from all authors.
      await removeBookFromAuthors(bookDoc._id, bookDoc.authors)
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
  bookId: Types.ObjectId,
  updatedBook: Partial<BookObject>
) => {
  try {
    const bookDoc = await Book.findById(bookId).exec()
    if (!bookDoc) {
      throw new DocumentNotFoundError(`Book ${bookId} not found.`)
    }

    //Remove this book from all authors.
    await removeBookFromAuthors(bookDoc._id, bookDoc.authors)

    // Create a new document using ES6 Spread syntax.
    const newDocument = { ...bookDoc.toObject(), ...updatedBook }

    //Add this book to all authors.
    await addBookToAuthors(newDocument._id, newDocument.authors)

    return await Book.findByIdAndUpdate(bookId, newDocument).exec()
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}
