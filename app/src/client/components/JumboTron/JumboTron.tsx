import Link from 'next/link'
import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'

import styles from './jumbotron.module.css'

export default function JumboTron() {
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>NextJS Library App</h1>
      <h2 className={styles.subtitle}>
        Assisting you in the pursuit of knowledge
      </h2>
      <Link href='/about'>
        <a className={styles.link}>More Info...</a>
      </Link>
    </div>
  )
}
