import useBooks from '../../hooks/useBooks'
import AppStatus from '../AppStatus'
import BookCardDisplay from '../BookCardDisplay'
import FilterMenu from '../FilterMenu'

import styles from './LibraryDisplay.module.css'

export default function LibraryDisplay() {
  return (
    <div className={styles.container}>
      <FilterMenu />
      <BookCardDisplay />
    </div>
  )
}
