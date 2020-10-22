import React, { useMemo } from 'react'
import useBooks from '../../hooks/useBooks'
import AppStatus from '../AppStatus'
import BookCard from '../BookCard/BookCard'

import styles from './BookCardDisplay.module.css'

export default function BookCardDisplay() {
  const { data, error, loading } = useBooks()

  const Display = useMemo(() => {
    if (!data || data.length === 0) {
      if (error) {
        return (
          <AppStatus
            type={'Error'}
            message={'Error retrieving data from Database.'}
          />
        )
      }
      if (loading) {
        return (
          <AppStatus
            type={'Loading'}
            message={'Please wait, loading data...'}
          />
        )
      }
      return (
        <AppStatus
          type={'Error'}
          message={'No Books were found for that query'}
        />
      )
    }
    return data.map((book) => <BookCard key={book._id} {...book} />)
  }, [data, error, loading])

  return <div className={styles.container}>{Display}</div>
}
