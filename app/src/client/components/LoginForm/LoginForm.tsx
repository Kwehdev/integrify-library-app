import { useContext, useState } from 'react'
import { request, gql } from 'graphql-request'
import { useRouter } from 'next/router'

import ThemeContext from '../../context/ThemeContext'
import styles from './loginform.module.css'
import { validateFormInput } from '../../utils/validateInput'
import { AuthContext } from '../../context/AuthContext/AuthContext'

const initialState = {
  username: '',
  password: '',
}

export default function RegistrationForm() {
  const [formInputs, setFormInputs] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState(
    'Please fill in the required fields.'
  )

  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { user, reAuthenticate, isAuthenticated } = useContext(AuthContext)
  const { primaryTextColor, formColor, formInputColor } = appTheme

  const router = useRouter()

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormInputs((prev) => ({ ...prev, [name]: value }))
    let error: string = ''
    error = validateFormInput(name, value)
    ev.target.setCustomValidity(error)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation LoginUser($user: UserLoginInput) {
        loginUser(user: $user)
      }
    `

    const variables = {
      user: formInputs,
    }

    try {
      await request('/api/v1/graphql', query, variables)
      await reAuthenticate()
      setFormStatus('Login Successful. You will be redirected shortly.')
    } catch (e) {
      console.log(e)
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
        <h2 className={styles.title}>Login</h2>
        <p className={styles.status}>{formStatus}</p>
      </legend>
      <fieldset
        className={styles.fieldset}
        style={{ color: primaryTextColor }}
        disabled={disabled}
      >
        <div>
          <input
            className={styles.input}
            type='text'
            name='username'
            onChange={handleChange}
            placeholder='Username'
            value={formInputs.username}
            aria-label='Input for Username'
            required
          />
          <input
            className={styles.input}
            type='password'
            name='password'
            onChange={handleChange}
            placeholder='********'
            value={formInputs.password}
            aria-label='Input for Password'
            required
          />
          <div className={styles.btnContainer}>
            <input type='submit' value='Submit' className={styles.submitBtn} />
          </div>
        </div>
      </fieldset>
    </form>
  )
}
