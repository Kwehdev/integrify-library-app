import { findAuthorById, findAuthorByName } from '../../services/authorServices'
import { findBooksInDB } from '../../services/bookServices'

export default async function getBooks(_parent, _args, _context, _info) {
  //Deconstruct Args & Stringify to remove Null Prototype inferred by Apollo Server.
  const { query } = JSON.parse(JSON.stringify(_args))

  if (!query) {
    return await findBooksInDB()
  }

  const { _id, limit, title, author, status, genre, ISBN } = query

  let authorId
  if (author) {
    const authorDoc = await findAuthorByName(author)
    if (authorDoc) {
      authorId = authorDoc._id
    }
  }

  const regexedArgs = {
    ...(title && { title }),
    ...(status && { status }),
    ...(ISBN && { ISBN }),
  }

  //Set default limit to 0/unlimited, assign passed limit if applicable.
  let limitOfResults: number = 0
  if (limit) {
    limitOfResults = Array.isArray(limit) ? parseInt(limit[0]) : parseInt(limit)
  }
  const queryKeys = Object.keys(regexedArgs)
  //Assign RegExp to each key.
  const dbQuery = Object.assign(
    {},
    {
      ...(_id && { _id }),
      ...(authorId && { authorId }),
      ...(genre && { genre: genre }),
    },
    ...queryKeys.map((key) => ({
      [key]: new RegExp(regexedArgs[key], 'i'),
    }))
  )
  console.log(dbQuery)
  //Note - If no params were passed, dbQuery will be an empty object, returning all books (as intended)
  return await findBooksInDB(dbQuery, limitOfResults)
}
