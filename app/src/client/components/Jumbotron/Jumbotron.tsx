import Link from 'next/link'

import styles from './Jumbotron.module.css'

export default function Jumbotron() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NextJS LibraryApp</h1>
      <h2 className={styles.subtitle}>
        Helping you in the pursuit of Knowledge.
      </h2>
      <Link href='/about'>
        <a className={styles.link}>Learn more...</a>
      </Link>
    </div>
  )
}
