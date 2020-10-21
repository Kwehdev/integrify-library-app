import { useContext } from 'react'
import { BookContext } from '../context/BookContext'

export default function useBooks() {
  const ctx = useContext(BookContext)

  if (!ctx) {
    throw new Error("'useBooks was called outside of a BookProvider")
  }

  return ctx
}
