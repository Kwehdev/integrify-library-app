import { Schema } from "mongoose";
import { AuthorDocument } from "../models/Author";
import { findAuthorById } from "../services/authorServices";

const addBookToAuthors = async (
  bookId: Schema.Types.ObjectId,
  authorIds: AuthorDocument["_id"][]
) => {
  for (const _id of authorIds) {
    const authorDoc = await findAuthorById(_id);
    authorDoc.books.push(bookId);
    await authorDoc.save();
  }
};

export default addBookToAuthors;
