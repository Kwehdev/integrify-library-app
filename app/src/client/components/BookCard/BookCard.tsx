import styles from './BookCard.module.css'

export default function BookCard({ title, imageURI }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageURI} />
      </div>
      <h2>{title}</h2>
    </div>
  )
}
