import request, { gql } from 'graphql-request'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const APIDataContext = createContext(undefined)

export const APIDataProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const refreshData = useCallback(async () => {
    try {
      const query = gql`
        {
          getBooks {
            title
          }
        }
      `

      const { getBooks } = await request('/api/v1/graphql', query)
      setData(getBooks)
    } catch (e) {
      setError(e)
    }
  }, [])

  useEffect(() => {
    if (data) return
    refreshData()
  }, [refreshData, data])

  const value = useMemo(
    () => ({
      data,
      error,
      refreshData,
      loading: data === null && error === null,
    }),
    [data, error, refreshData]
  )
  return (
    <APIDataContext.Provider value={value}>{children}</APIDataContext.Provider>
  )
}
