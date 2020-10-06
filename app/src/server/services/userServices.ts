import { Schema } from "mongoose"
import { DatabaseError, DocumentNotFoundError } from "../helpers/apiError"
import User, { UserObject } from "../models/User"

export const createNewUserInDB = async (user: UserObject) => {
  try {
    const userDoc = await User.create(user)
    if (!userDoc) {
      throw new DatabaseError(`Failed to create ${user.username} in database.`)
    }
    return userDoc
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findUserById = async (userId: Schema.Types.ObjectId) => {
  try {
    const userDoc = await User.findById(userId).exec()
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
