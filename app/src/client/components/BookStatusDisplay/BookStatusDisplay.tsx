import request, { gql } from 'graphql-request'
import { Types } from 'mongoose'
import { useMemo, useState } from 'react'
import { BookStatus } from '../../../server/types'
import useAuth from '../../hooks/useAuth'
import useBooks from '../../hooks/useBooks'

import styles from './BookStatusDisplay.module.css'

type BookStatusDisplayProps = {
  _id: Types.ObjectId
  status: BookStatus
  borrowedBy?: Types.ObjectId
  borrowDate?: string
  dueDate?: string
}

export default function BookStatusDisplay({
  _id,
  status,
  borrowDate,
  dueDate,
  borrowedBy,
}: BookStatusDisplayProps) {
  //Refactor this
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { borrowBook, returnBook } = useBooks()
  const isAvailable = status === 'Available'

  const BookStatusText = useMemo(
    () => (
      <p>
        This Book is currently{' '}
        <span
          className={
            isAvailable ? styles.status__available : styles.status__unavailable
          }
        >
          {status}
        </span>
      </p>
    ),
    [status]
  )

  const handleBorrow = async () => {
    setLoading(true)
    await borrowBook(_id)
    setLoading(false)
  }
  const handleReturn = async () => {
    setLoading(true)
    await returnBook(_id)
    setLoading(false)
  }

  const disabled = loading

  const AvailableBookDisplay = useMemo(
    () => (
      <div className={styles.userOptions}>
        {isAuthenticated ? (
          <>
            <button
              className={styles.btn}
              onClick={handleBorrow}
              disabled={disabled}
            >
              Borrow this book
            </button>
          </>
        ) : (
          <p>Please login to checkout a book.</p>
        )}
      </div>
    ),
    []
  )
  const UnavailableBookDisplay = useMemo(
    () => (
      <div className={styles.userOptions}>
        {isAuthenticated ? (
          <>
            <p>This book is due to be returned on {dueDate}</p>
            {borrowedBy === user.userId && (
              <button
                className={styles.btn}
                onClick={handleReturn}
                disabled={disabled}
              >
                Return this book
              </button>
            )}
          </>
        ) : (
          <p>Please login to return a book.</p>
        )}
      </div>
    ),
    []
  )

  return (
    <div>
      {BookStatusText}

      {isAvailable ? AvailableBookDisplay : UnavailableBookDisplay}
    </div>
  )
}
