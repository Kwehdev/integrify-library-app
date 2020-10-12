import { useContext, useState } from 'react'

import ThemeContext from '../../context/ThemeContext'
import { isFormInputValid, validateFormInput } from '../../utils/validateInput'
import styles from './registrationform.module.css'

const initialState = {
  username: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  email: '',
}

export default function RegistrationForm() {
  const [formInputs, setFormInputs] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const { appTheme, setCurrentTheme } = useContext(ThemeContext)
  const { primaryTextColor, formColor, formInputColor } = appTheme

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormInputs((prev) => ({ ...prev, [name]: value }))

    let error: string = ''
    if (name === 'confirmPassword') {
      error = validateFormInput(name, value, formInputs.password)
    } else {
      error = validateFormInput(name, value)
    }
    ev.target.setCustomValidity(error)
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)
  }

  const disabled = loading

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.container}
      style={{ backgroundColor: formColor }}
    >
      <legend className={styles.legend}>
        <h2 style={{ color: primaryTextColor }} className={styles.title}>
          Sign Up
        </h2>
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
            style={{
              color: primaryTextColor,
            }}
            type='email'
            name='email'
            onChange={handleChange}
            placeholder='Email'
            value={formInputs.email}
            aria-label='Input for Email'
            required
          />
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type='text'
              name='firstName'
              onChange={handleChange}
              placeholder='First Name'
              value={formInputs.firstName}
              aria-label='Input for First Name'
              required
            />
            <input
              className={styles.input}
              style={{ marginLeft: `auto` }}
              type='text'
              name='lastName'
              onChange={handleChange}
              placeholder='Last Name'
              value={formInputs.lastName}
              aria-label='Input for Last Name'
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='Password'
              value={formInputs.password}
              aria-label='Input for Password'
              required
            />
            <input
              className={styles.input}
              style={{ marginLeft: `auto` }}
              type='password'
              name='confirmPassword'
              onChange={handleChange}
              placeholder='Confirm Password'
              value={formInputs.confirmPassword}
              aria-label='Input for Confirm Password'
              required
            />
          </div>
          <div className={styles.btnContainer}>
            <input type='submit' value='Submit' className={styles.submitBtn} />
          </div>
        </div>
      </fieldset>
    </form>
  )
}
