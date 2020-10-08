import { Types } from 'mongoose'

declare global {
  namespace NodeJS {
    interface Global {
      __userId: Types.ObjectId
      __adminId: Types.ObjectId
    }
  }
}

export default async () => {
  global.__userId = undefined
  global.__adminId = undefined
}