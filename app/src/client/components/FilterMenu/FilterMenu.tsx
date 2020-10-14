import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import ThemeContext from '../../context/ThemeContext'
import useTypedSelector from '../../hooks/typedUseSelector'
import { setBookFilterQuery } from '../../redux/actions/BookFilterActions'

import styles from './filtermenu.module.css'

const initialState = {
  limit: 0,
  title: '',
  author: '',
  status: '',
  genre: '',
  ISBN: '',
}

export default function FilterMenu() {
  const [filterOptions, setFilterOptions] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const { appTheme } = useContext(ThemeContext)
  const { primaryTextColor } = appTheme

  const disabled = loading

  const handleChange = (
    ev:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = ev.target
    setFilterOptions((prev) => ({ ...prev, [name]: value }))
    console.log(filterOptions)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    dispatch(setBookFilterQuery(filterOptions))
    setLoading(false)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <legend>
        <h2 className={styles.title} style={{ color: primaryTextColor }}>
          Search Books
        </h2>
      </legend>
      <fieldset
        className={styles.fieldset}
        style={{ color: primaryTextColor }}
        disabled={disabled}
      >
        <label className={styles.label}>
          Title:
          <input
            className={styles.input}
            type='text'
            name='title'
            onChange={handleChange}
            placeholder='Enter title...'
            value={filterOptions.title}
            aria-label='Input for Title'
          />
        </label>
        <label className={styles.label}>
          Author:
          <input
            className={styles.input}
            type='text'
            name='author'
            onChange={handleChange}
            placeholder='Enter author...'
            value={filterOptions.author}
            aria-label='Input for Author'
          />
        </label>
        <label className={styles.label}>
          Genre:
          <input
            className={styles.input}
            type='text'
            name='genre'
            onChange={handleChange}
            placeholder='Enter genre...'
            value={filterOptions.genre}
            aria-label='Input for Genre'
          />
        </label>
        <label className={styles.label}>
          ISBN:
          <input
            className={styles.input}
            type='text'
            name='ISBN'
            onChange={handleChange}
            placeholder='Enter ISBN...'
            value={filterOptions.ISBN}
            aria-label='Input for ISBN'
          />
        </label>
        <label className={styles.label}>
          Limit of results:
          <input
            className={styles.input}
            type='number'
            name='limit'
            onChange={handleChange}
            placeholder='Enter Limit...'
            value={filterOptions.limit}
            aria-label='Input for Limit'
          />
        </label>
        <label className={styles.label}>
          Select book status
          <select
            name='status'
            onChange={handleChange}
            defaultValue=''
            className={styles.input}
          >
            <option className={styles.selectOption} disabled value=''>
              Select an option
            </option>
            <option className={styles.selectOption} value='Available'>
              Available
            </option>
            <option className={styles.selectOption} value='Unavailable'>
              Unavailable
            </option>
          </select>
        </label>
        <div className={styles.btnContainer}>
          <input
            type='submit'
            value='Apply Filters'
            className={styles.submitBtn}
          />
        </div>
      </fieldset>
    </form>
  )
}
