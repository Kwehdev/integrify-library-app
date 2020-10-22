import request, { gql } from 'graphql-request'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormInput from '../FormInput'
import FormSubmitBtn from '../FormSubmitBtn'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
}

export default function UpdateProfileForm() {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [formStatus, setFormStatus] = useState('Enter fields to update')

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
      mutation UpdateUserProfile($userId: ID, $user: UserUpdateProfileInput) {
        updateUserProfile(userId: $userId, user: $user)
      }
    `

    const { firstName, lastName, email } = formValues

    const filteredValues = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
    }

    const variables = {
      userId,
      user: filteredValues,
    }

    try {
      const { updateUserProfile } = await request(
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
        legendText='Update a User'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        <FormInput
          key={`Input firstName`}
          type='text'
          name='firstName'
          placeholder='Updated First name...'
          onChange={handleChange}
          value={formValues[name]}
        />
        <FormInput
          key={`Input lastName`}
          type='text'
          name='lastName'
          placeholder='Updated Last name...'
          onChange={handleChange}
          value={formValues[name]}
        />
        <FormInput
          key={`Input email`}
          type='email'
          name='email'
          placeholder='Updated email'
          onChange={handleChange}
          value={formValues[name]}
        />
        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
