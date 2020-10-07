import { Schema } from "mongoose"
import { DocumentNotFoundError } from "../../helpers/apiError"
import { AuthorObject } from "../../models/Author"
import { BookObject } from "../../models/Book"
import { createNewAuthorInDB } from "../../services/authorServices"
import {
  createNewBookInDB,
  findBookById,
  findBookByIdAndDelete,
  findBookByIdAndUpdate,
} from "../../services/bookServices"
import {
  createNewUserInDB,
  findUserById,
  findUserByIdAndDelete,
  findUserByIdAndUpdate,
} from "../../services/userServices"

const newBook = (authorId: Schema.Types.ObjectId): BookObject => ({
  ISBN: "9780006479888",
  imageURI:
    "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0064/9780006479888.jpg",
  title: "A Game of Thrones",
  description:
    "Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun. As Warden of the north, Lord Eddard Stark counts it a curse when King Robert bestows on him the office of the Hand. His honour weighs him down at court where a true man does what he will, not what he must ...and a dead enemy is a thing of beauty. The old gods have no power in the south, Stark's family is split and there is treachery at court. Worse, the vengeance-mad heir of the deposed Dragon King has grown to maturity in exile in the Free Cities. He claims the Iron Throne.",
  status: "Available",
  authors: [authorId],
  publisher: "Harper Collins",
  publishedDate: "01 Mar 2009",
  genre: ["Fantasy"],
})

let authorId

beforeAll(async () => {
  //We need to first create an Author, as an author is required in order to add a book.
  const newAuthor: AuthorObject = {
    name: "George R. R. Martin",
    books: [],
  }
  const authorDoc = await createNewAuthorInDB(newAuthor)
  authorId = authorDoc._id
})

describe("Perform general DB actions on data.", () => {
  let bookId

  test("Should create a new Book", async () => {
    const bookDoc = await createNewBookInDB(newBook(authorId))
    //No need to compare every value at this point. If this matches, the User was created.
    expect(bookDoc.title).toBe("A Game of Thrones")
    bookId = bookDoc._id
  })

  test("Should find the previously created Book.", async () => {
    const bookDoc = await findBookById(bookId)

    expect(bookDoc.title).toBe("A Game of Thrones")
  })

  test("Should update the previously created Book.", async () => {
    await findBookByIdAndUpdate(bookId, {
      title: "A Storm of Swords",
    })
    const newBookDoc = await findBookById(bookId)
    expect(newBookDoc.title).toBe("A Storm of Swords")
  })

  test("Should delete the previously created Book.", async () => {
    await findBookByIdAndDelete(bookId)

    await expect(findBookById(bookId)).rejects.toThrow(DocumentNotFoundError)
  })
})
