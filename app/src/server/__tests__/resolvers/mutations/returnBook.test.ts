import { gql } from 'apollo-server-micro'
import { Types } from 'mongoose'
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'
import { findBookById } from '../../../services/bookServices'
import { findUserById } from '../../../services/userServices'

describe('Test authorization', () => {
  test('Will not continue if user is not logged in', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          returnBook(bookId: "${global.__bookId}") {
            title
          }
        }`,
    })

    expect(response.errors[0].message).toBe(
      'You must be logged in to perform this action.'
    )
  })
})

describe('Check book will be unassigned', () => {
  //First assign the book.
  test('Will assign book to user.', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          borrowBook(bookId: "${global.__bookId}") {
            title
          }
        }`,
    })

    expect(response.data.borrowBook).toMatchObject({
      title: 'A Game of Thrones',
    })
  })

  test('Will not continue if user does not own the book.', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__adminId, 'ADMIN'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          returnBook(bookId: "${global.__bookId}") {
            title
          }
        }`,
    })

    expect(response.errors[0].message).toBe('You do not own this book.')
  })

  test('Will unassign book to user.', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          returnBook(bookId: "${global.__bookId}") {
            title
          }
        }`,
    })

    expect(response.data.returnBook).toMatchObject({
      title: 'A Game of Thrones',
    })
  })

  test('Book will no longer have User as borrowerId', async () => {
    const bookDoc = await findBookById(global.__bookId)
    expect(bookDoc.borrowedBy).toStrictEqual(undefined)
  })

  test('User will no longer hold the book.', async () => {
    const userDoc = await findUserById(global.__userId)
    expect(userDoc.books).not.toContainEqual(global.__bookId)
  })
})
