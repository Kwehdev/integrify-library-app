import request, { gql } from 'graphql-request'
import { Types } from 'mongoose'
import { BookStatus } from '../../../server/types'
import useAuth from '../../hooks/useAuth'

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
  const { isAuthenticated, user } = useAuth()

  const isAvailable = status === 'Available'

  const handleBorrow = async () => {
    const query = gql`
      mutation BorrowBook($bookId: ID) {
        borrowBook(bookId: $bookId) {
          title
        }
      }
    `

    const variables = {
      bookId: _id,
    }

    const response = await request('/api/v1/graphql', query, variables)
  }

  const handleReturn = () => {}

  return (
    <div>
      <p>
        This book is currently{' '}
        <span
          className={
            isAvailable ? styles.status__available : styles.status__unavailable
          }
        >
          {status}
        </span>
      </p>

      {isAuthenticated &&
        (isAvailable ? (
          <button onClick={handleBorrow}>Borrow this book</button>
        ) : (
          <>
            <p>This book is due on {dueDate}</p>
            {user._id === borrowedBy && (
              <button onClick={handleReturn}>Return this book</button>
            )}
          </>
        ))}
    </div>
  )
}
