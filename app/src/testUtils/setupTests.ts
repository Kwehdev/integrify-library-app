import mongoose from 'mongoose'
import { createMockUser } from './dbUtils'
process.env.ADMIN_NAME = 'KwehDev'
process.env.JWT_PRIVATE_KEY = 'NotSoPrivateAnymoreKey'
process.env.TOKEN_EXPIRY_TIME = '500'

beforeAll(async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/testDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
    }
  } catch (error) {
    console.error('Failed to connect to testing database')
    process.exit(1)
  }
  const userDoc = await createMockUser('USER')
  global.__userId = userDoc._id
  const adminDoc = await createMockUser('ADMIN')
  global.__adminId = adminDoc._id
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})
