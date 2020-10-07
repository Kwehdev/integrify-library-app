import { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

import { ApolloServer, gql } from 'apollo-server-micro'
import registerUser from '../../../../src/server/resolvers/mutations/registerUser'
import { GQLContext } from '../../../../src/server/types'
import { getPayloadFromCookie } from '../../../../src/server/utils/cookieUtils'

import typeDefs from '../../../../src/server/typeDefs'

const resolvers = {
  Mutation: {
    registerUser: registerUser,
  },
}

type ContextProps = {
  req: NextApiRequest
  res: NextApiResponse
}

const context = ({ req, res }: ContextProps): GQLContext => {
  if (!mongoose.connection.readyState) {
    try {
      mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    } catch (e) {
      console.error(`Error connecting GraphQL to Mongoose.`)
      process.exit(1)
    }
  }
  return {
    req: Object.assign({}, req, {
      user: getPayloadFromCookie(req.cookies),
    }),
    res,
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

const handler = apolloServer.createHandler({
  path: `/api/v1/graphql`,
})

//Override NextJS Defaults.
export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
