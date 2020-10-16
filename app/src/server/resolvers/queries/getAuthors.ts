import { findAuthorsInDB } from '../../services/authorServices'
import { GQLMutation } from '../../types'

const getAuthors: GQLMutation = async (_parent, _args, _context) => {
  //Deconstruct Args & Stringify to remove Null Prototype inferred by Apollo Server.
  const { query } = JSON.parse(JSON.stringify(_args))
  const { limit } = query

  //Set default limit to 0/unlimited, assign passed limit if applicable.
  let limitOfResults: number = 0
  if (limit) {
    limitOfResults = Array.isArray(limit) ? parseInt(limit[0]) : parseInt(limit)
  }

  //Note - If no params were passed, dbQuery will be an empty object, returning all books (as intended)
  findAuthorsInDB({}, limitOfResults)
}

export default getAuthors
