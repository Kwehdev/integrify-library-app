import { gql } from 'apollo-server-micro'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'
import { findAuthorById } from '../../../services/authorServices'

describe('Test authorization', () => {
  test('Will not continue if user is not logged in, or admin', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          updateAuthor(authorId: "${global.__authorId}", author: { name: "Stephen King" }) {
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

  test('Will update author if user is admin', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__adminId, 'ADMIN'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })

    const response = await mutate({
      mutation: gql`
        mutation {
          updateAuthor(authorId: "${global.__authorId}", author: { name: "Stephen King" }) {
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

    const newAuthorDoc = await findAuthorById(global.__authorId)

    expect(newAuthorDoc.name).toBe('Stephen King')
  })
})
