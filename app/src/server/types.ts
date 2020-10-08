import { Schema } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export type UserRole = "USER" | "ADMIN";
export type BookStatus = "Available" | "Unavailable";
export type BookGenre = "Fantasy";

export type UserPayload = {
  userId: Schema.Types.ObjectId;
  username: string;
  role: UserRole;
};

//GraphQL
export type CustomRequest = {
  user?: UserPayload;
};

export type GQLContext = {
  req: NextApiRequest & CustomRequest;
  res: NextApiResponse;
};

export type GQLMutation = (
  _parent: any,
  _args: any,
  _context: GQLContext
) => Promise<any>;
