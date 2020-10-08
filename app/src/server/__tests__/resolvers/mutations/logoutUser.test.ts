import { gql } from 'apollo-server-micro'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'

import getTestServer from '../../../../testUtils/getTestServer'

const LOGOUT_USER = gql`
  mutation {
    logoutUser
  }
`

beforeAll(async () => {
  const REGISTER_VALID_USER = gql`
    mutation {
      registerUser(
        user: {
          username: "HelloWorld"
          password: "ThisIsAValidPassword1"
          confirmPassword: "ThisIsAValidPassword1"
          firstName: "Tom"
          lastName: "Mot"
          email: "Email@notGoogle.com"
        }
      )
    }
  `

  const { mutate } = getTestServer()
  await mutate({ mutation: REGISTER_VALID_USER })
})

describe('Will test user logout', () => {
  test('Will not continue if user is not signed in.', async () => {
    const { mutate } = getTestServer()

    const response = await mutate({ mutation: LOGOUT_USER })
    expect(response.errors[0].message).toBe(
      'You cannot perform this action while logged out.'
    )
  })

  test('Will logout User', async () => {
    const setHeader = jest.fn()
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock({ setHeader })
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({ mutation: LOGOUT_USER })
    expect(setHeader).toHaveBeenCalledWith('Set-Cookie', expect.any(String))
  })
})
