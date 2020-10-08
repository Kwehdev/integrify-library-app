import loginUser from './mutations/loginUser';
import registerUser from './mutations/registerUser';

const resolvers = {
  Mutation: {
    registerUser: registerUser,
    loginUser: loginUser,
  },
};

export default resolvers;
