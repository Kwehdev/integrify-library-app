import { useContext } from 'react'
import { APIDataContext } from '../context/APIDataContext'

export default function useAPIData() {
  const ctx = useContext(APIDataContext)

  if (!ctx) {
    throw new Error(
      "'useAPIData was called outside of a APIDataContextProvider"
    )
  }

  return ctx
}
