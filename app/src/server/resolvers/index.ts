//Book
import createBook from './mutations/createBook'
import updateBook from './mutations/updateBook'
import deleteBook from './mutations/deleteBook'

//User
import loginUser from './mutations/loginUser'
import logoutUser from './mutations/logoutUser'
import registerUser from './mutations/registerUser'
import resetUserPasswordRequest from './mutations/resetUserPasswordRequest'
import updateUserPassword from './mutations/updateUserPassword'
import updateUserProfile from './mutations/updateUserProfile'

//Author
import createAuthor from './mutations/createAuthor'
import deleteAuthor from './mutations/deleteAuthor'
import updateAuthor from './mutations/updateAuthor'

const resolvers = {
  Mutation: {
    createBook,
    updateBook,
    deleteBook,

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
