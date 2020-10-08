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

const INVALID_USERNAME_LOGIN = gql`
  mutation {
    loginUser(
      user: { username: "InvalidUser", password: "ThisIsAValidPassword1" }
    )
  }
`;

const INVALID_PASSWORD_LOGIN = gql`
  mutation {
    loginUser(
      user: { username: "HelloWorld", password: "ThisIsAnInvalidPassword1" }
    )
  }
`;

const LOGIN_USER = gql`
  mutation {
    loginUser(
      user: { username: "HelloWorld", password: "ThisIsAValidPassword1" }
    )
  }
`;

beforeAll(async () => {
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

  const { mutate } = getTestServer(ctx({}, {}));
  await mutate({ mutation: REGISTER_VALID_USER });
});

describe('Will test user login', () => {
  test('Will not continue if user is signed in', async () => {
    const { mutate } = getTestServer(
      ctx(
        {
          user: {},
        },
        {}
      )
    );

    const response = await mutate({ mutation: LOGIN_USER });
    expect(response.errors[0].message).toBe(
      'You cannot perform this action while logged in.'
    );
  });

  test('Will not accept invalid username', async () => {
    const { mutate } = getTestServer(ctx({}, {}));
    const response = await mutate({
      mutation: INVALID_USERNAME_LOGIN,
    });
    expect(response.errors[0].message).toBe('Invalid username or password');
  });

  test('Will not accept invalid password', async () => {
    const { mutate } = getTestServer(ctx({}, {}));
    const response = await mutate({
      mutation: INVALID_PASSWORD_LOGIN,
    });
    expect(response.errors[0].message).toBe('Invalid username or password');
  });

  test('Will login User', async () => {
    const setHeader = jest.fn();

    const { mutate } = getTestServer(
      ctx(
        {},
        {
          setHeader,
        }
      )
    );

    const response = await mutate({ mutation: LOGIN_USER });
    expect(setHeader).toBeCalledTimes(1);
  });
});
