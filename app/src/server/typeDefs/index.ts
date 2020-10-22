import { gql } from 'graphql-request'

const typeDefs = gql`
  type Query {
    getUserProfile: UserProfile
    getBooks(query: BookQueryInput): [Book]!
    getAuthors(query: AuthorQueryInput): [Author]!
  }

  type Mutation {
    registerUser(user: UserRegisterInput): String
    loginUser(user: UserLoginInput): String
    logoutUser: String
    updateUserProfile(userId: ID, user: UserUpdateProfileInput): String
    updateUserPassword(userId: ID, user: UserUpdatePasswordInput): String
    resetUserPasswordRequest(email: String!): String
    createAuthor(author: AuthorCreateInput): Author
    deleteAuthor(authorId: ID): Author
    updateAuthor(authorId: ID, author: AuthorUpdateInput): Author
    createBook(book: BookCreateInput): Book
    updateBook(bookId: ID, book: BookUpdateInput): Book
    deleteBook(bookId: ID): Book
    borrowBook(bookId: ID): Book
    returnBook(bookId: ID): Book
  }

  type UserProfile {
    userId: ID
    username: String
    role: String
    firstName: String
    lastName: String
    email: String
  }

  input UserRegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    firstName: String!
    lastName: String!
  }

  input UserLoginInput {
    username: String!
    password: String!
  }

  input UserUpdateProfileInput {
    firstName: String
    lastName: String
    email: String
  }

  input UserUpdatePasswordInput {
    oldPassword: String
    newPassword: String
    confirmNewPassword: String
  }
  input AuthorCreateInput {
    name: String!
  }

  input AuthorUpdateInput {
    name: String
  }

  input AuthorQueryInput {
    limit: Int
  }

  type Author {
    _id: ID!
    name: String!
    books: [Book]!
  }

  type Book {
    _id: ID!
    ISBN: String!
    imageURI: String!
    title: String!
    description: String!
    status: BookStatus!
    authors: [Author!]!
    publisher: String!
    publishedDate: String!
    genre: [Genre!]!
    borrowerId: ID
    borrowDate: String
    dueDate: String
  }

  enum Genre {
    Fantasy
  }

  enum BookStatus {
    Available
    Unavailable
  }

  input BookCreateInput {
    ISBN: String!
    imageURI: String!
    title: String!
    description: String!
    status: BookStatus!
    authors: [ID!]!
    publisher: String!
    publishedDate: String!
    genre: [Genre!]
  }

  input BookQueryInput {
    id: ID
    limit: Int
    title: String
    author: String
    status: String
    genre: String
    ISBN: String
  }

  input BookUpdateInput {
    ISBN: String
    imageURI: String
    title: String
    description: String
    status: BookStatus
    authors: [ID]
    publisher: String
    publishedDate: String
    genre: [Genre]
  }
`
export default typeDefs
