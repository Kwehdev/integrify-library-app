import { DocumentNotFoundError } from "../../helpers/apiError"
import { UserObject } from "../../models/User"
import {
  createNewUserInDB,
  findUserById,
  findUserByIdAndDelete,
  findUserByIdandUpdate,
} from "../../services/userServices"

const newUser: UserObject = {
  username: "Username",
  hash: "Hash",
  firstName: "FirstName",
  lastName: "LastName",
  email: "Email",
  role: "USER",
  books: [],
}

describe("Perform general DB actions on data.", () => {
  let userId

  test("Should create a new User", async () => {
    const userDoc = await createNewUserInDB(newUser)
    //No need to compare every value at this point. If this matches, the User was created.
    expect(userDoc.username).toBe("Username")
    userId = userDoc._id
  })

  test("Should find the previously created User.", async () => {
    const userDoc = await findUserById(userId)

    expect(userDoc.username).toBe("Username")
  })

  test("Should update the previously created User.", async () => {
    const userDoc = await findUserByIdandUpdate(userId, {
      username: "Spaghetti Monster",
    })

    console.log(userDoc)

    expect(userDoc.username).toBe("Spaghetti Monster")
  })

  test("Should delete the previously created User.", async () => {
    await findUserByIdAndDelete(userId)

    expect(findUserById(userId)).rejects.toThrow(DocumentNotFoundError)
  })
})
