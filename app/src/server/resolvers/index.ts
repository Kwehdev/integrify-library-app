import loginUser from './mutations/loginUser'
import logoutUser from './mutations/logoutUser'
import registerUser from './mutations/registerUser'
import updateUserProfile from './mutations/updateUserProfile'

const resolvers = {
  Mutation: {
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    updateUserProfile: updateUserProfile,
  },
}

export default resolvers
