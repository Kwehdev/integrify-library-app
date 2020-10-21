import React, { useMemo } from 'react'
import AppStatus from '../AppStatus'
import BookCard from '../BookCard/BookCard'

import styles from './BookCardDisplay.module.css'

export default function BookCardDisplay({ books }) {
  const BookCards = useMemo(
    () => books.map((book) => <BookCard key={book._id} {...book} />),
    [books]
  )

  if (books.length === 0) {
    return (
      <AppStatus
        type={'Error'}
        message={'No Books were found for that query'}
      />
    )
  }

  return <div className={styles.container}>{BookCards}</div>
}
