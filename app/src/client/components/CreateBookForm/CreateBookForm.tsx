import { gql, request } from 'graphql-request'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'

import styles from './createbookform.module.css'

const initialState = {
  name: '',
}

export default function CreateBookForm() {
  const [formInputs, setFormInputs] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState(
    'Please fill in the required fields.'
  )
  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryTextColor, formColor, formInputColor } = appTheme

  const router = useRouter()

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation CreateAuthor($author: AuthorCreateInput) {
        createAuthor(author: $author) {
          _id
          name
        }
      }
    `

    const variables = {
      author: formInputs,
    }

    try {
      const { createAuthor } = await request(
        '/api/v1/graphql',
        query,
        variables
      )
      const { _id, name } = createAuthor
      setFormStatus(
        `Author ${name} has been created successfully under ID: ${_id}`
      )
    } catch (e) {
      setFormStatus(e.response.errors[0].message)
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
        <h2 className={styles.title}>Enter new Author</h2>
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
          name='name'
          onChange={handleChange}
          placeholder='Author Name'
          value={formInputs.name}
          aria-label='Input for Author Name'
          required
        />
        <div className={styles.btnContainer}>
          <input type='submit' value='Submit' className={styles.submitBtn} />
        </div>
      </fieldset>
    </form>
  )
}
