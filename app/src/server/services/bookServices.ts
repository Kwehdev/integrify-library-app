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

export const findBooksInDB = async (args: any = {}) => {
  const { _id, limit, title, author, status, genre, ISBN } = args
  //Ensure only keys we want are passed through, and only if they exist.
  const query = {
    ...(title && { title }),
    ...(status && { status }),
    ...(ISBN && { ISBN }),
  }
  //Set default limit to 0/unlimited, assign passed limit if applicable.
  let limitOfResults: number = 0
  if (limit) {
    limitOfResults = Array.isArray(limit) ? parseInt(limit[0]) : parseInt(limit)
  }
  const queryKeys = Object.keys(query)
  //Assign RegExp to each key.
  const dbQuery = Object.assign(
    {},
    {
      ...(_id && { _id }),
      ...(author && { authors: author }),
      ...(genre && { genre: genre }),
    },
    ...queryKeys.map((key) => ({
      [key]: new RegExp(query[key], 'i'),
    }))
  )
  //Note - If no params were passed, dbQuery will be an empty object, returning all books (as intended)
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
