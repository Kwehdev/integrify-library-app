import mongoose, { Types } from 'mongoose'
import { BookObject } from '../server/models/Book'
import { createNewAuthorInDB } from '../server/services/authorServices'
import { createNewBookInDB } from '../server/services/bookServices'
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
  const authorDoc = await createNewAuthorInDB({
    name: 'George R. R. Martin',
    books: [],
  })
  global.__authorId = authorDoc._id
  const bookDoc = await createNewBookInDB(bookObj(global.__authorId))
  global.__bookId = bookDoc._id
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})

const bookObj = (authorId: Types.ObjectId): BookObject => ({
  ISBN: '9780006479888',
  imageURI:
    'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0064/9780006479888.jpg',
  title: 'A Game of Thrones',
  description:
    "Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun. As Warden of the north, Lord Eddard Stark counts it a curse when King Robert bestows on him the office of the Hand. His honour weighs him down at court where a true man does what he will, not what he must ...and a dead enemy is a thing of beauty. The old gods have no power in the south, Stark's family is split and there is treachery at court. Worse, the vengeance-mad heir of the deposed Dragon King has grown to maturity in exile in the Free Cities. He claims the Iron Throne.",
  status: 'Available',
  authors: [authorId],
  publisher: 'Harper_Collins',
  publishedDate: '01 Mar 2009',
  genre: ['Fantasy'],
})
