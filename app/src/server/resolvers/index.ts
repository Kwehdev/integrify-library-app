import loginUser from './mutations/loginUser'
import logoutUser from './mutations/logoutUser'
import registerUser from './mutations/registerUser'
import resetUserPasswordRequest from './mutations/resetUserPasswordRequest'
import updateUserPassword from './mutations/updateUserPassword'
import updateUserProfile from './mutations/updateUserProfile'

const resolvers = {
  Mutation: {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    updateUserPassword,
    resetUserPasswordRequest,
  },
}

export default resolvers
