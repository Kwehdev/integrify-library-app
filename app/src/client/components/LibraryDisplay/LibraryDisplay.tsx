import useAPIData from '../../hooks/useAPIData'
import AppStatus from '../AppStatus'
import BookCardDisplay from '../BookCardDisplay'
import FilterMenu from '../FilterMenu'

import styles from './LibraryDisplay.module.css'

export default function LibraryDisplay() {
  const { data, error, loading } = useAPIData()

  if (loading) {
    return (
      <AppStatus type={'Loading'} message={'Please wait, loading data...'} />
    )
  }

  if (error) {
    return (
      <AppStatus
        type={'Error'}
        message={'Error retrieving data from Database.'}
      />
    )
  }

  return (
    <div className={styles.container}>
      <FilterMenu />
      <BookCardDisplay books={data} />
    </div>
  )
}
