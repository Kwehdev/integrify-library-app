import { DocumentNotFoundError } from "../../helpers/apiError"
import { AuthorObject } from "../../models/Author"
import {
  createNewAuthorInDB,
  findAuthorById,
  findAuthorByIdAndDelete,
  findAuthorByIdAndUpdate,
} from "../../services/authorServices"
import {} from "../../services/userServices"

const newAuthor: AuthorObject = {
  name: "George R. R. Martin",
}

describe("Perform general DB actions on data.", () => {
  let authorId

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

  test("Should update the previously created Author.", async () => {
    const authorDoc = await findAuthorByIdAndUpdate(authorId, {
      name: "Stephen King",
    })
    const newAuthorDoc = await findAuthorById(authorId)
    expect(newAuthorDoc.name).toBe("Stephen King")
  })

  test("Should delete the previously created Author.", async () => {
    await findAuthorByIdAndDelete(authorId)

    expect(findAuthorById(authorId)).rejects.toThrow(DocumentNotFoundError)
  })
})
