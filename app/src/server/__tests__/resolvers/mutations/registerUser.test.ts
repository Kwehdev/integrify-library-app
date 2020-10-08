import { gql } from 'apollo-server-micro'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'

import getTestServer from '../../../../testUtils/getTestServer'

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

const REGISTER_INVALID_USER = gql`
  mutation {
    registerUser(
      user: {
        username: "HelloWorld"
        password: "ThisIsAInvalidPassword"
        confirmPassword: "ThisIsAInvalidPassword"
        firstName: "Tom"
        lastName: "Mot"
        email: "Email@notGoogle.com"
      }
    )
  }
`

describe('Will test user creation', () => {
  test('Will not continue if user is signed in', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({ mutation: REGISTER_VALID_USER })
    expect(response.errors[0].message).toBe(
      'You cannot perform this action while logged in.'
    )
  })

  test('Will not accept incorrect inputs', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: REGISTER_INVALID_USER,
    })
    expect(response.errors[0].message).toBe('One or more Inputs were invalid.')
  })

  test('Will call setHeader, in prod this will return a cookie.', async () => {
    const setHeader = jest.fn()
    const req = createIncomingRequestMock()
    const res = createServerResponseMock({ setHeader })
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({ mutation: REGISTER_VALID_USER })
    expect(setHeader).toHaveBeenCalledWith('Set-Cookie', expect.any(String))
  })
})
