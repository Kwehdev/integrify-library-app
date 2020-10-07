import { Schema } from "mongoose"
import { DatabaseError, DocumentNotFoundError } from "../helpers/apiError"
import User, { UserObject } from "../models/User"

export const createNewUserInDB = async (user: UserObject) => {
  try {
    return await User.create(user)
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findUserById = async (userId: Schema.Types.ObjectId) => {
  try {
    return await User.findById(userId).exec()
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findUserByIdAndDelete = async (userId: Schema.Types.ObjectId) => {
  try {
    const userDoc = await User.findByIdAndDelete(userId).exec()
    if (!userDoc) {
      throw new DocumentNotFoundError(`User ${userId} not found.`)
    }
    return userDoc
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}

export const findUserByIdAndUpdate = async (
  userId: Schema.Types.ObjectId,
  updatedUser: Partial<UserObject>
) => {
  try {
    const userDoc = await User.findById(userId).exec()
    if (!userDoc) {
      throw new DocumentNotFoundError(`User ${userId} not found.`)
    }
    // Create a new document using ES6 Spread syntax.
    const newDocument = { ...userDoc.toObject(), ...updatedUser }

    return await User.findByIdAndUpdate(userId, newDocument).exec()
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      throw err
    }
    throw new DatabaseError(err)
  }
}
