import mongoose from 'mongoose'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.DB_URI, options)
    } catch (e) {
      console.error(`Error connecting to Mongoose`)
    }
  }
}
