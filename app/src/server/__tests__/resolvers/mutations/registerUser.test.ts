import { gql } from "apollo-server-micro";
import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
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

const MUTATE_X = gql`
  mutation {
    mutateX(ids: [{ one: 1 }, { two: 2 }]) {
      resultText
    }
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

describe("Will test user creation", () => {
  test("Will not continue if user is signed in", async () => {
    const req = createIncomingRequestMock({
      user: mockUser,
    });
    const res = createServerResponseMock();
    const { mutate } = getTestServer({ req, res });

    const response = await mutate({ mutation: REGISTER_VALID_USER });
    expect(response.errors[0].message).toBe(
      "You cannot perform this action while logged in."
    );
  });

  test("Will not accept incorrect inputs", async () => {
    const req = createIncomingRequestMock();
    const res = createServerResponseMock();
    const { mutate } = getTestServer({ req, res });
    const response = await mutate({
      mutation: REGISTER_INVALID_USER,
    });
    expect(response.errors[0].message).toBe("One or more Inputs were invalid.");
  });

  test("Will call setHeader, in prod this will return a cookie.", async () => {
    const setHeader = jest.fn();
    const req = createIncomingRequestMock();
    const res = createServerResponseMock({ setHeader });
    const { mutate } = getTestServer({ req, res });

    const response = await mutate({ mutation: REGISTER_VALID_USER });
    expect(setHeader).toHaveBeenCalledWith("Set-Cookie", expect.any(String));
  });
});
