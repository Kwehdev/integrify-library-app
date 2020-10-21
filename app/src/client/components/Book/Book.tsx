import { Types } from 'mongoose'
import React, { useMemo } from 'react'
import { BookGenre, BookStatus } from '../../../server/types'
import BookStatusDisplay from '../BookStatusDisplay'

import styles from './Book.module.css'

type BookProps = {
  _id: Types.ObjectId
  ISBN: string
  imageURI: string
  title: string
  description: string
  status: BookStatus
  authors: {
    name: string
  }[]
  publisher: string
  publishedDate: string
  genre: BookGenre[]
  borrowedBy?: Types.ObjectId
  borrowDate?: string
  dueDate?: string
}

export default function Book({
  _id,
  ISBN,
  imageURI,
  title,
  description,
  status,
  authors,
  publisher,
  publishedDate,
  genre,
  borrowedBy,
  borrowDate,
  dueDate,
}: BookProps) {
  const Authors = useMemo(
    () =>
      authors.map(({ name }) => <li className={styles.menuItem}>{name}</li>),
    [authors]
  )

  const Genres = useMemo(
    () => genre.map((genre) => <li className={styles.menuItem}>{genre}</li>),
    [genre]
  )

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageURI} alt='Book Image' />
      </div>
      <article className={styles.bookContent}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.infoContainer}>
          <p>ISBN: {ISBN}</p>
          <p>Publisher: {publisher}</p>
          <p>Publication Date: {publishedDate}</p>
          <ul className={styles.menu}>Genres: {Genres}</ul>
          <ul className={styles.menu}>Authors: {Authors}</ul>
        </div>

        <BookStatusDisplay
          _id={_id}
          status={status}
          borrowDate={borrowDate}
          dueDate={dueDate}
          borrowedBy={borrowedBy}
        />
      </article>
    </div>
  )
}
