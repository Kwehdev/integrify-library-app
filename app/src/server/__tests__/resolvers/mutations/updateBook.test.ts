import { gql } from 'apollo-server-micro'
import { Types } from 'mongoose'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'

describe('Test authorization', () => {
  test('Will not continue if user is not logged in & admin', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          updateBook(bookId: "${global.__bookId}", book: {
            title: "A GAME of THRONES"
          }) {
            _id
            title
            authors {
              name
            }
          }
        }
      `,
    })

    expect(response.errors[0].message).toBe('Access Denied')
  })

  test('Will create book if user is admin', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__adminId, 'ADMIN'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          updateBook(bookId: "${global.__bookId}", book: {
            title: "A GAME of THRONES"
          }) {
            _id
            title
            authors {
              name
            }
          }
        }
      `,
    })

    //We have not called populate, so authors will be null. Will probably implement this on all calls in future, but I would like to see usage first.
    expect(response.data.updateBook).toMatchObject({
      _id: expect.any(String),
      title: 'A Game of Thrones',
      authors: [null],
    })
  })
})
