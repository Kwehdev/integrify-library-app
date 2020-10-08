import { gql } from 'apollo-server-micro'

import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'

describe('Test inputs are validated', () => {
  test('Will return invalid input.', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          updateUserProfile(userId: "${global.__userId}", user: {
            firstName: "UpdatedFirstName"
            lastName: "UpdatedLastName",
            email: "NotAValidEmail"
          })
        }`,
    })
    expect(response.errors[0].message).toBe('One or more Inputs were invalid.')
  })
})

describe('Will test user update permissions', () => {
  test('Will not continue if user is not logged in', async () => {
    const req = createIncomingRequestMock()
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
      mutation {
        updateUserProfile(userId: "${global.__userId}", user: {
          firstName: "UpdatedFirstName"
          lastName: "UpdatedLastName",
          email: "Updated@Email.com"
        })
      }`,
    })
    expect(response.errors[0].message).toBe(
      'You cannot perform this action while logged out.'
    )
  })

  test('User cannot update someone else', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
      mutation {
        updateUserProfile(userId: "${global.__adminId}", user: {
          firstName: "UpdatedFirstName"
          lastName: "UpdatedLastName",
          email: "Updated@Email.com"
        })
      }`,
    })
    expect(response.errors[0].message).toBe(
      'You are not authorized to perform this action'
    )
  })

  test('User can update themselves', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
      mutation {
        updateUserProfile(userId: "${global.__userId}", user: {
          firstName: "UpdatedFirstName"
          lastName: "UpdatedLastName",
          email: "Updated@Email.com"
        })
      }`,
    })
    expect(response.data.updateUserProfile).toBe(
      'Successfully updated User Profile'
    )
  })

  test('Admin can update a different user', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__adminId, 'ADMIN'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
      mutation {
        updateUserProfile(userId: "${global.__userId}", user: {
          firstName: "UpdatedFirstName"
          lastName: "UpdatedLastName",
          email: "UpdatedByAdmin@Email.com"
        })
      }`,
    })
    expect(response.data.updateUserProfile).toBe(
      'Successfully updated User Profile'
    )
  })
})
