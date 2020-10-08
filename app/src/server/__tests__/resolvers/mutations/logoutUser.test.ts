import { gql } from "apollo-server-micro";
import {
  createIncomingRequestMock,
  createServerResponseMock,
  mockUser,
} from "../../../../testUtils/contextUtils";

import getTestServer from "../../../../testUtils/getTestServer";

const ctx = (req, res) => {
  return {
    req: { ...createIncomingRequestMock, ...req },
    res: { ...createServerResponseMock, ...res },
  };
};

const LOGOUT_USER = gql`
  mutation {
    logoutUser
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

  const { mutate } = getTestServer();
  await mutate({ mutation: REGISTER_VALID_USER });
});

describe("Will test user logout", () => {
  test("Will not continue if user is not signed in.", async () => {
    const { mutate } = getTestServer();

    const response = await mutate({ mutation: LOGOUT_USER });
    expect(response.errors[0].message).toBe(
      "You cannot perform this action while logged out."
    );
  });

  test("Will logout User", async () => {
    const setHeader = jest.fn();
    const req = createIncomingRequestMock({ user: mockUser });
    const res = createServerResponseMock({ setHeader });
    const { mutate } = getTestServer({ req, res });

    const response = await mutate({ mutation: LOGOUT_USER });
    expect(setHeader).toHaveBeenCalledWith("Set-Cookie", expect.any(String));
  });
});
