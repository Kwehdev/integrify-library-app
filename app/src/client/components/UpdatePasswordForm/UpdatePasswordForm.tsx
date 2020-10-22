import request, { gql } from 'graphql-request'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormInput from '../FormInput'
import FormSubmitBtn from '../FormSubmitBtn'

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [formStatus, setFormStatus] = useState('Set new password.')

  const { user } = useAuth()
  const { userId } = user

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation UpdateUserPassword($userId: ID, $user: UserUpdatePasswordInput) {
        updateUserPassword(userId: $userId, user: $user)
      }
    `

    const variables = {
      userId,
      user: formValues,
    }

    try {
      const { updateUserPassword } = await request(
        '/api/v1/graphql',
        query,
        variables
      )
      setFormStatus(`Successfully updated.`)
    } catch (e) {
      setFormStatus(e.response.errors[0].message)
    }
    setLoading(false)
  }
  const disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Update your password'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        <FormInput
          key={`Input oldPassword`}
          type='password'
          name='oldPassword'
          placeholder='Enter current password...'
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormInput
          key={`Input new password`}
          type='password'
          name='newPassword'
          placeholder='Enter new password...'
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormInput
          key={`Input new password again`}
          type='password'
          name='confirmNewPassword'
          placeholder='Enter new password again...'
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
