import { useMemo } from 'react'
import styles from './FormSelect.module.css'

export default function FormSelect({ changeHandler, optionData }) {
  const Options = useMemo(
    () =>
      optionData.map(({ value, toDisplay }) => (
        <option key={value} className={styles.option} value={value}>
          {toDisplay}
        </option>
      )),
    optionData
  )

  return (
    <select
      className={styles.select}
      defaultValue='Select'
      onChange={changeHandler}
    >
      <option disabled value='Select'>
        Select an option
      </option>
      {Options}
    </select>
  )
}
