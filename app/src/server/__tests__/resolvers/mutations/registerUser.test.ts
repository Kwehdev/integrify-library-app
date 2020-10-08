import { gql } from 'apollo-server-micro';
import {
  createIncomingRequestMock,
  createServerResponseMock,
} from '../../../../testUtils/contextUtils';

import getTestServer from '../../../../testUtils/getTestServer';

const ctx = (req, res) => {
  return {
    req: { ...createIncomingRequestMock, ...req },
    res: { ...createServerResponseMock, ...res },
  };
};

const REGISTER_VALID_USER = gql`
  mutation {
    registerUser(
      user: {
        username: "HelloWorld"
        password: "ThisIsAValidPassword1"
        confirmPassword: "ThisIsAValidPassword1"
        firstName: "Tom"
        lastName: "Mot"
        email: "Email@notGoogle.com"
      }
    )
  }
`;
const REGISTER_INVALID_USER = gql`
  mutation {
    registerUser(
      user: {
        username: "HelloWorld"
        password: "ThisIsAInvalidPassword"
        confirmPassword: "ThisIsAInvalidPassword"
        firstName: "Tom"
        lastName: "Mot"
        email: "Email@notGoogle.com"
      }
    )
  }
`;

describe('Will test user creation', () => {
  test('Will not continue if user is signed in', async () => {
    const { mutate } = getTestServer(
      ctx(
        {
          user: {},
        },
        {}
      )
    );

    const response = await mutate({ mutation: REGISTER_VALID_USER });
    expect(response.errors[0].message).toBe(
      'You cannot perform this action while logged in.'
    );
  });

  test('Will not accept incorrect inputs', async () => {
    const { mutate } = getTestServer(ctx({}, {}));
    const response = await mutate({
      mutation: REGISTER_INVALID_USER,
    });
    expect(response.errors[0].message).toBe('One or more Inputs were invalid.');
  });

  test('Will create new user', async () => {
    const setHeader = jest.fn();

    const { mutate } = getTestServer(
      ctx(
        {},
        {
          setHeader,
        }
      )
    );

    const response = await mutate({ mutation: REGISTER_VALID_USER });
    expect(setHeader).toBeCalledTimes(1);
  });
});
