import registerUser from './mutations/registerUser'

const resolvers = {
  Mutation: {
    registerUser: registerUser,
  },
}

export default resolvers
