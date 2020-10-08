import { ApolloServer } from "apollo-server-micro";
import {
  createTestClient,
  ApolloServerTestClient,
} from "apollo-server-testing";
import { Context } from "react";
import resolvers from "../server/resolvers";
import typeDefs from "../server/typeDefs";
import { GQLContext } from "../server/types";
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from "./contextUtils";

//Create new text client, passing our context.
const getTestServer = (
  context = {
    req: createIncomingRequestMock(),
    res: createServerResponseMock(),
  }
) =>
  createTestClient(
    new ApolloServer({
      typeDefs,
      resolvers,
      context,
    })
  );

export default getTestServer;
