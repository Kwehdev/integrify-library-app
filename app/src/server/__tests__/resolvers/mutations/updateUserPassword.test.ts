import { gql } from 'apollo-server-micro'

import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils'
import { getMockUser } from '../../../../testUtils/dbUtils'
import getTestServer from '../../../../testUtils/getTestServer'

describe('Test inputs are validated', () => {
  test('Will return invalid password', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          updateUserPassword(userId: "${global.__userId}", user: {
            oldPassword: "DINOSAUR"
            newPassword: "123",
            confirmNewPassword: "123"
          })
        }`,
    })
    expect(response.errors[0].message).toBe('Invalid password')
  })

  test('Will return invalid input.', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__userId, 'USER'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
        mutation {
          updateUserPassword(userId: "${global.__userId}", user: {
            oldPassword: "SuperSecretPassword1"
            newPassword: "123",
            confirmNewPassword: "123"
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
        updateUserPassword(userId: "${global.__userId}", user: {
          oldPassword: "SuperSecretPassword1"
          newPassword: "ThisIsAValidPassword2",
          confirmNewPassword: "ThisIsAValidPassword2"
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
        updateUserPassword(userId: "${global.__adminId}", user: {
          oldPassword: "SuperSecretPassword1"
          newPassword: "ThisIsAValidPassword2",
          confirmNewPassword: "ThisIsAValidPassword2"
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
        updateUserPassword(userId: "${global.__userId}", user: {
          oldPassword: "SuperSecretPassword1"
          newPassword: "ThisIsAValidPassword2",
          confirmNewPassword: "ThisIsAValidPassword2"
        })
      }`,
    })
    expect(response.data.updateUserPassword).toBe(
      'Successfully updated User Password'
    )
  })

  test('Admin can update a different user regardless of old password', async () => {
    const req = createIncomingRequestMock({
      user: getMockUser(global.__adminId, 'ADMIN'),
    })
    const res = createServerResponseMock()
    const { mutate } = getTestServer({ req, res })
    const response = await mutate({
      mutation: gql`
      mutation {
        updateUserPassword(userId: "${global.__userId}", user: {
          oldPassword: "SuperSecretPassword1"
          newPassword: "ThisIsAValidPassword2",
          confirmNewPassword: "ThisIsAValidPassword2"
        })
      }`,
    })
    expect(response.data.updateUserPassword).toBe(
      'Successfully updated User Password'
    )
  })
})
