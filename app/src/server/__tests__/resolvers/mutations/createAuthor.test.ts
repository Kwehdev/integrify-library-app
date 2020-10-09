import { gql } from 'apollo-server-micro'
import { Types } from 'mongoose'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'

describe('Test authorization', () => {
  test('Will not continue if user is not logged in', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          createAuthor(author: { name: "George R. R. Martin" }) {
            _id
            name
            books {
              title
              description
            }
          }
        }
      `,
    })

    expect(response.errors[0].message).toBe('Access Denied')
  })

  test('Will not continue if user is not admin', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          createAuthor(author: { name: "George R. R. Martin" }) {
            _id
            name
            books {
              title
              description
            }
          }
        }
      `,
    })

    expect(response.errors[0].message).toBe('Access Denied')
  })
  test('Will create author if user is admin', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__adminId, 'ADMIN'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          createAuthor(author: { name: "George R. R. Martin" }) {
            _id
            name
            books {
              title
              description
            }
          }
        }
      `,
    })

    expect(response.data.createAuthor).toMatchObject({
      _id: expect.any(String),
      name: 'George R. R. Martin',
      books: [],
    })
  })
})
