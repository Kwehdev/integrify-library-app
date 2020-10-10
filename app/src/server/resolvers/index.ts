//Book

import loginUser from './mutations/loginUser'
import logoutUser from './mutations/logoutUser'
import registerUser from './mutations/registerUser'
import resetUserPasswordRequest from './mutations/resetUserPasswordRequest'
import updateUserPassword from './mutations/updateUserPassword'
import updateUserProfile from './mutations/updateUserProfile'

//Author
import createAuthor from './mutations/createAuthor'
import deleteAuthor from './mutations/deleteAuthor'

const resolvers = {
  Mutation: {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    updateUserPassword,
    resetUserPasswordRequest,

    createAuthor,
    deleteAuthor,
  },
}

export default resolvers
