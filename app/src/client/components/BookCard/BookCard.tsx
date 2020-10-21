import Link from 'next/link'
import styles from './BookCard.module.css'

export default function BookCard({ _id, title, imageURI }) {
  return (
    <Link href={`/books/${_id.toString()}`}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageURI} />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  )
}
