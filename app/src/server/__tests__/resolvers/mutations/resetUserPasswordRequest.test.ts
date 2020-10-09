import { gql } from 'apollo-server-micro'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'
import * as emailUtils from '../../../utils/emailUtils'

describe('Test ', () => {
  test('Will not continue if user is logged in', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          resetUserPasswordRequest(email: "hello@mail.com")
        }
      `,
    })

    expect(response.errors[0].message).toBe(
      'You cannot perform this action while logged in.'
    )
  })

  test('Will not call sendEmail if email does not exist, but will return text', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const sendEmail = jest.spyOn(emailUtils, 'sendEmail')
    const response = await mutate({
      mutation: gql`
        mutation {
          resetUserPasswordRequest(email: "hello@mail.com")
        }
      `,
    })

    expect(sendEmail).toBeCalledTimes(0)

    expect(response.data.resetUserPasswordRequest).toBe(
      'If we find a user for that email address, we will send you an email shortly.'
    )
  })

  test('Will call sendEmail with a valid email, and return text.', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const sendEmail = jest.spyOn(emailUtils, 'sendEmail')
    const response = await mutate({
      mutation: gql`
        mutation {
          resetUserPasswordRequest(email: "USER@domain.com")
        }
      `,
    })

    expect(sendEmail).toBeCalledTimes(1)

    expect(response.data.resetUserPasswordRequest).toBe(
      'If we find a user for that email address, we will send you an email shortly.'
    )
  })
})
