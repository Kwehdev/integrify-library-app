import request, { gql } from 'graphql-request'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const BookContext = createContext(undefined)

export const BookProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [filterQuery, setFilterQuery] = useState({})

  const refreshData = async () => {
    try {
      const query = gql`
        query GetBooks($query: BookQueryInput) {
          getBooks(query: $query) {
            _id
            ISBN
            imageURI
            title
            description
            status
            authors {
              name
            }
            publisher
            publishedDate
            genre
            borrowDate
            dueDate
          }
        }
      `

      const variables = {
        query: filterQuery,
      }

      const { getBooks } = await request('/api/v1/graphql', query, variables)
      console.log(getBooks)
      setData(getBooks)
    } catch (e) {
      console.log(e)
      setError(e)
    }
  }

  const updateFilters = async (filters) => {
    const { title, author, ISBN, limit, status } = filters

    const newFilters = {
      ...(title && { title }),
      ...(author && { author }),
      ...(ISBN && { ISBN }),
      ...(limit && { limit }),
      ...(status && { status }),
    }

    console.log(newFilters)
    setFilterQuery(newFilters)
  }

  const borrowBook = async (bookId) => {
    const query = gql`
      mutation BorrowBook($bookId: ID) {
        borrowBook(bookId: $bookId) {
          title
        }
      }
    `

    const variables = {
      bookId,
    }

    const { borrowBook } = await request('/api/v1/graphql', query, variables)
    await refreshData()
    return borrowBook
  }

  const returnBook = async (bookId) => {
    const query = gql`
      mutation ReturnBook($bookId: ID) {
        returnBook(bookId: $bookId) {
          title
        }
      }
    `

    const variables = {
      bookId,
    }

    const { returnBook } = await request('/api/v1/graphql', query, variables)
    await refreshData()
    return returnBook
  }

  useEffect(() => {
    if (data) return
    refreshData()
  }, [refreshData, data])

  useEffect(() => {
    refreshData()
  }, [filterQuery])

  const value = useMemo(
    () => ({
      data,
      error,
      refreshData,
      loading: data === null && error === null,
      updateFilters,
      borrowBook,
      returnBook,
    }),
    [data, error, refreshData, updateFilters]
  )
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}
