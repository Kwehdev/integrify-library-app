import loginUser from "./mutations/loginUser";
import logoutUser from "./mutations/logoutUser";
import registerUser from "./mutations/registerUser";

const resolvers = {
  Mutation: {
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  },
};

export default resolvers;
