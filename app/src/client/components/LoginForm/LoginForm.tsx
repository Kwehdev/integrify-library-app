import { useContext, useState } from 'react'
import { request, gql } from 'graphql-request'
import { useRouter } from 'next/router'

import ThemeContext from '../../context/ThemeContext'
import styles from './loginform.module.css'
import { UserContext } from '../../context/UserContext/UserContext'
import { validateFormInput } from '../../utils/validateInput'

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
  const { user, reAuthenticate, isAuthenticated } = useContext(UserContext)
  const { primaryTextColor, formColor, formInputColor } = appTheme

  const shouldRedirect = isAuthenticated

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
      setFormStatus(
        'Successfully logged in. You will be redirected in 5 seconds.'
      )

      setTimeout(() => {
        router.push('/')
      }, 5000)
    } catch (e) {
      console.log(e)
      setFormStatus(e.response.errors[0].message)
      setLoading(false)
    }
  }

  const disabled = loading

  if (shouldRedirect) {
    setTimeout(() => {
      router.push('/')
    }, 5000)
    return (
      <h1 className={styles.title} style={{ color: primaryTextColor }}>
        You are already logged in. You will be redirected in 5 seconds.
      </h1>
    )
  }

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
