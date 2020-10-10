import { gql } from 'apollo-server-micro'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'

describe('Test authorization', () => {
  test('Will not continue if user is not admin', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          deleteBook(bookId: "${global.__bookId}") {
            _id
            title
          }
        }
      `,
    })

    expect(response.errors[0].message).toBe('Access Denied')
  })

  test('Will return deleted book when user is admin', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__adminId, 'ADMIN'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          deleteBook(bookId: "${global.__bookId}") {
            _id
            title
          }
        }
      `,
    })

    //We have not added any books, therefore, books will be null.
    expect(response.data.deleteBook).toMatchObject({
      _id: expect.any(String),
      title: 'A Game of Thrones',
    })
  })
})
