import { findBooksInDB } from '../../services/bookServices'

export default async function getBooks(_parent, _args, _context, _info) {
  //Deconstruct Args & Stringify to remove Null Prototype inferred by Apollo Server.
  const { query } = JSON.parse(JSON.stringify(_args))
  return await findBooksInDB(query)
}
