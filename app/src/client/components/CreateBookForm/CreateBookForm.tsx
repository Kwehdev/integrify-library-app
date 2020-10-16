import { gql, request } from 'graphql-request'
import { useRouter } from 'next/router'
import { useContext, useMemo, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'

import styles from './createbookform.module.css'

const initialState = {
  ISBN: '',
  imageURI: '',
  title: '',
  description: '',
  status: 'Available',
  authors: [],
  publisher: '',
  publishedDate: '',
  genre: ['Fantasy'],
}

export default function CreateBookForm({ authors }) {
  const [formInputs, setFormInputs] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState(
    'Please fill in the required fields.'
  )
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryTextColor, formColor, formInputColor } = appTheme

  const router = useRouter()

  const AuthorOptions = useMemo(() => {
    const authorArray = JSON.parse(authors)
    return authorArray.map(({ _id, name }, index) => (
      <option key={`${name}:${index}`} value={_id}>
        {name}
      </option>
    ))
  }, [authors])

  const handleChange = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = ev.target
    setFormInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation CreateBook($book: BookCreateInput) {
        createBook(book: $book) {
          _id
          title
        }
      }
    `

    const variables = {
      book: formInputs,
    }

    try {
      const { createBook } = await request('/api/v1/graphql', query, variables)
      const { _id, title } = createBook
      setFormStatus(
        `Book ${title} has been created successfully under ID: ${_id}`
      )
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  const disabled = loading

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.container}
      style={{ color: primaryTextColor, backgroundColor: formColor }}
    >
      <legend className={styles.legend}>
        <h2 className={styles.title}>Enter new Book</h2>
        <p className={styles.status}>{formStatus}</p>
      </legend>
      <fieldset
        className={styles.fieldset}
        style={{ color: primaryTextColor }}
        disabled={disabled}
      >
        <input
          className={styles.input}
          type='text'
          name='title'
          onChange={handleChange}
          placeholder='Book Title'
          value={formInputs.title}
          aria-label='Input for Book Title'
          required
        />
        <input
          className={styles.input}
          type='text'
          name='ISBN'
          onChange={handleChange}
          placeholder='Book ISBN'
          value={formInputs.ISBN}
          aria-label='Input for Book ISBN'
          required
        />
        <input
          className={styles.input}
          type='text'
          name='imageURI'
          onChange={handleChange}
          placeholder='Book Image URI'
          value={formInputs.imageURI}
          aria-label='Input for Book Image URI'
          required
        />
        <input
          className={styles.input}
          type='text'
          name='publishedDate'
          onChange={handleChange}
          placeholder='Book Publication Date'
          value={formInputs.publishedDate}
          aria-label='Input for Book Publication Date'
          required
        />
        <input
          className={styles.input}
          type='text'
          name='publisher'
          onChange={handleChange}
          placeholder='Book Publisher'
          value={formInputs.publisher}
          aria-label='Input for Book Publisher'
          required
        />
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          name='description'
          onChange={handleChange}
          placeholder='Book Description'
          value={formInputs.description}
          aria-label='Input for Book Description'
          rows={5}
          required
        />
        <select
          name='authors'
          onChange={handleChange}
          defaultValue=''
          className={styles.input}
        >
          <option className={styles.selectOption} disabled value=''>
            Select authors
          </option>
          {AuthorOptions}
        </select>

        <div className={styles.btnContainer}>
          <input type='submit' value='Submit' className={styles.submitBtn} />
        </div>
      </fieldset>
    </form>
  )
}
