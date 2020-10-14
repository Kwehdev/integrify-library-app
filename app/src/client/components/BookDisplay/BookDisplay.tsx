import request, { gql } from 'graphql-request'
import { useEffect, useMemo, useState } from 'react'
import useTypedSelector from '../../hooks/typedUseSelector'

export default function BookDisplay() {
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(undefined)

  const bookFilters = useTypedSelector((state) => state.bookFilters)

  useEffect(() => {
    const getBooks = async () => {
      const query = `
      query GetBooks($query: BookQueryInput) {
        getBooks(query: $query) {
          title
        }
      }`
      const variables = {
        query: bookFilters,
      }

      try {
        const response = await request('/api/v1/graphql', query, variables)
        setData(response.getBooks)
      } catch (e) {
        setError(e.message)
      }
    }
    getBooks()
  }, [bookFilters])

  if (error) {
    return (
      <div>
        <h1>Error loading Book Data.</h1>
        <p>{error}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        <h1>Please wait, loading book data...</h1>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div>
        <h1>
          No Books were found for that search query. Please revise your filters.
        </h1>
      </div>
    )
  }

  console.log(data)

  return <div>RAA</div>
}
