import { DocumentNotFoundError } from "../../helpers/apiError"
import { AuthorObject } from "../../models/Author"
import { BookObject } from "../../models/Book"
import {
  createNewAuthorInDB,
  findAuthorById,
  findAuthorByIdAndDelete,
  findAuthorByIdAndUpdate,
} from "../../services/authorServices"
import { createNewBookInDB, findBookById } from "../../services/bookServices"
import {} from "../../services/userServices"

const newAuthor: AuthorObject = {
  name: "George R. R. Martin",
  books: [],
}

describe("Perform general DB actions on data.", () => {
  let authorId
  let bookId

  test("Should create a new User", async () => {
    const authorDoc = await createNewAuthorInDB(newAuthor)
    //No need to compare every value at this point. If this matches, the User was created.
    expect(authorDoc.name).toBe("George R. R. Martin")
    authorId = authorDoc._id
  })

  test("Should find the previously created Author.", async () => {
    const authorDoc = await findAuthorById(authorId)

    expect(authorDoc.name).toBe("George R. R. Martin")
  })

  test("Should create a new Book to be added to our author", async () => {
    const bookObj: BookObject = {
      ISBN: "9780006479888",
      imageURI:
        "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0064/9780006479888.jpg",
      title: "A Game of Thrones",
      description:
        "Summers span decades. Winter can last a lifetime. And the struggle for the Iron Throne has begun. As Warden of the north, Lord Eddard Stark counts it a curse when King Robert bestows on him the office of the Hand. His honour weighs him down at court where a true man does what he will, not what he must ...and a dead enemy is a thing of beauty. The old gods have no power in the south, Stark's family is split and there is treachery at court. Worse, the vengeance-mad heir of the deposed Dragon King has grown to maturity in exile in the Free Cities. He claims the Iron Throne.",
      status: "Available",
      genre: ["Fantasy"],
      publisher: "Harper Collins",
      publishedDate: "01 Mar 2009",
      authors: [authorId],
    }

    const bookDoc = await createNewBookInDB(bookObj)
    bookId = bookDoc._id
    expect(bookDoc.title).toBe("A Game of Thrones")
  })

  test("Should update the previously created Author.", async () => {
    await findAuthorByIdAndUpdate(authorId, {
      books: [bookId],
    })
    const newAuthorDoc = await findAuthorById(authorId)
    expect(newAuthorDoc.books).toContainEqual(bookId)
  })

  test("Should delete the previously created Author.", async () => {
    await findAuthorByIdAndDelete(authorId)

    await expect(findAuthorById(authorId)).rejects.toThrow(
      DocumentNotFoundError
    )
  })

  test("Book should be deleted, as there is no longer any author associated.", async () => {
    await expect(findBookById(bookId)).rejects.toThrow(DocumentNotFoundError)
  })
})
