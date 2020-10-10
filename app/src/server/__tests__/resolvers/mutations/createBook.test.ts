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
          createBook(book: {
            ISBN: "9780006479888"
            imageURI: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0064/9780006479888.jpg"
            title: "A Game of Thrones"
            description: "Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun. As Warden of the north, Lord Eddard Stark counts it a curse when King Robert bestows on him the office of the Hand. His honour weighs him down at court where a true man does what he will, not what he must ...and a dead enemy is a thing of beauty. The old gods have no power in the south, Stark's family is split and there is treachery at court. Worse, the vengeance-mad heir of the deposed Dragon King has grown to maturity in exile in the Free Cities. He claims the Iron Throne."
            status: Available
            authors: ["${global.__authorId}"]
            publisher: Harper_Collins
            publishedDate: "01 Mar 2009"
            genre: [Fantasy]
          }) {
            _id
            title
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
          createBook(book: {
            ISBN: "9780006479888"
            imageURI: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0064/9780006479888.jpg"
            title: "A Game of Thrones"
            description: "Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun. As Warden of the north, Lord Eddard Stark counts it a curse when King Robert bestows on him the office of the Hand. His honour weighs him down at court where a true man does what he will, not what he must ...and a dead enemy is a thing of beauty. The old gods have no power in the south, Stark's family is split and there is treachery at court. Worse, the vengeance-mad heir of the deposed Dragon King has grown to maturity in exile in the Free Cities. He claims the Iron Throne."
            status: Available
            authors: ["${global.__authorId}"]
            publisher: Harper_Collins
            publishedDate: "01 Mar 2009"
            genre: [Fantasy]
          }) {
            _id
            title
          }
        }
      `,
    })

    expect(response.data.createBook).toMatchObject({
      _id: expect.any(String),
      title: 'A Game of Thrones',
    })
  })
})
