import mongoose from "mongoose"

beforeAll(async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/testDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      })
    }
  } catch (error) {
    console.error("Failed to connect to testing database")
    process.exit(1)
  }
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})
