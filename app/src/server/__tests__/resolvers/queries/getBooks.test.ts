import { gql } from 'apollo-server-micro'
import { Types } from 'mongoose'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import getTestServer from '../../../../testUtils/getTestServer'
import { BookObject } from '../../../models/Book'
import { createNewBookInDB } from '../../../services/bookServices'

beforeAll(async () => {
  const bookObj: BookObject = {
    ISBN: '9780006479895',
    imageURI:
      'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0064/9780006479895.jpg',
    title: 'A Clash of Kings',
    description:
      'Throughout Westeros, the cold winds are rising. From the ancient citadel of Dragonstone to the forbidding lands of Winterfell, chaos reigns as pretenders to the Iron Throne of the Seven Kingdoms stake their claims through tempest, turmoil and war. As a prophecy of doom cuts across the sky - a comet the colour of blood and flame - five factions struggle for control of a divided land. Brother plots against brother and the dead rise to walk in the night. Against a backdrop of incest, fratricide, alchemy and murder, the price of glory is measured in blood.',
    status: 'Available',
    authors: [global.__authorId],
    publisher: 'Harper_Collins',
    publishedDate: '01 Oct 1999',
    genre: ['Fantasy'],
  }

  await createNewBookInDB(bookObj)
})

describe('Test query fields', () => {
  test('Test get all books', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { query } = getTestServer({ req, res })
    const response = await query({
      query: gql`
        query {
          getBooks {
            title
          }
        }
      `,
    })
    expect(response.data.getBooks).toHaveLength(2)
  })

  test('Test get all books, but with limit on results', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { query } = getTestServer({ req, res })
    const response = await query({
      query: gql`
        query {
          getBooks(query: { limit: 1 }) {
            title
          }
        }
      `,
    })
    expect(response.data.getBooks).toHaveLength(1)
  })

  test('Test get by title', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { query } = getTestServer({ req, res })
    const response = await query({
      query: gql`
        query {
          getBooks(query: { title: "A game" }) {
            title
          }
        }
      `,
    })
    expect(response.data.getBooks).toEqual([{ title: 'A Game of Thrones' }])
  })

  test('Test get by author', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { query } = getTestServer({ req, res })
    const response = await query({
      query: gql`
        query {
          getBooks(query: { author: "${global.__authorId}" }) {
            title
          }
        }
      `,
    })
    expect(response.data.getBooks).toHaveLength(2)
  })

  test('Test get by genre', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { query } = getTestServer({ req, res })
    const response = await query({
      query: gql`
        query {
          getBooks(query: { genre: "Fantasy" }) {
            title
          }
        }
      `,
    })
    expect(response.data.getBooks).toHaveLength(2)
  })
})
