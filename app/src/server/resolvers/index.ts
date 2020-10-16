//Book
import getBooks from './queries/getBooks'

import createBook from './mutations/createBook'
import updateBook from './mutations/updateBook'
import deleteBook from './mutations/deleteBook'
import borrowBook from './mutations/borrowBook'
import returnBook from './mutations/returnBook'

//User
import getUserProfile from './queries/getUserProfile'

import loginUser from './mutations/loginUser'
import logoutUser from './mutations/logoutUser'
import registerUser from './mutations/registerUser'
import resetUserPasswordRequest from './mutations/resetUserPasswordRequest'
import updateUserPassword from './mutations/updateUserPassword'
import updateUserProfile from './mutations/updateUserProfile'

//Author
import getAuthors from './queries/getAuthors'

import createAuthor from './mutations/createAuthor'
import deleteAuthor from './mutations/deleteAuthor'
import updateAuthor from './mutations/updateAuthor'

const resolvers = {
  Query: {
    getUserProfile,
    getBooks,
    getAuthors,
  },

  Mutation: {
    createBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,

    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    updateUserPassword,
    resetUserPasswordRequest,

    createAuthor,
    deleteAuthor,
    updateAuthor,
  },
}

export default resolvers
