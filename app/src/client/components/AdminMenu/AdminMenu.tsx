import Link from 'next/link'
import styles from './AdminMenu.module.css'

export default function AdminMenu() {
  return (
    <div className={styles.container}>
      Admin
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link href='/authors/new'>
            <a className={styles.navLink}>New Author</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/authors/update'>
            <a className={styles.navLink}>Update an Author</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/authors/delete'>
            <a className={styles.navLink}>Delete an Author</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/books/new'>
            <a className={styles.navLink}>New Book</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/books/update'>
            <a className={styles.navLink}>Update a Book</a>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link href='/books/delete'>
            <a className={styles.navLink}>Delete a Book</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
