import { Types } from 'mongoose'
import { DatabaseError, DocumentNotFoundError } from '../helpers/apiError'
import User, { UserObject } from '../models/User'

export const createNewUserInDB = async (user: UserObject) => {
  try {
    return await User.create(user)
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findUserById = async (userId: Types.ObjectId) => {
  try {
    return await User.findById(userId).exec()
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findUserByUsername = async (username: string) => {
  const usernameRegex = new RegExp(`^${username}$`, 'i')
  try {
    return await User.findOne({ username: usernameRegex }).exec()
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findUserByEmail = async (email: string) => {
  const emailRegex = new RegExp(`^${email}$`, 'i')
  try {
    return await User.findOne({ email: emailRegex }).exec()
  } catch (err) {
    throw new DatabaseError(err)
  }
}

export const findUserByIdAndDelete = async (userId: Types.ObjectId) => {
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
  userId: Types.ObjectId,
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
