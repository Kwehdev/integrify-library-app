import { Types } from 'mongoose'

declare global {
  namespace NodeJS {
    interface Global {
      __userId: Types.ObjectId
      __adminId: Types.ObjectId
      __authorId: Types.ObjectId
      __bookId: Types.ObjectId
    }
  }
}

export default async () => {
  global.__userId = undefined
  global.__adminId = undefined
  global.__authorId = undefined
  global.__bookId = undefined
}
