import request, { gql } from 'graphql-request'
import React, { useMemo, useState } from 'react'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormInput from '../FormInput'
import FormSubmitBtn from '../FormSubmitBtn'

const initialState = {
  name: '',
}

const inputObjects = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Author Name...',
  },
]

export default function AuthorCreationForm() {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState(initialState)

  const [formStatus, setFormStatus] = useState(
    'Please enter the following information.'
  )

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
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
      author: formValues,
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
    }
    setLoading(false)
  }

  const FormInputs = useMemo(
    () =>
      inputObjects.map(({ name, type, placeholder }) => (
        <FormInput
          key={`Input ${name}`}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={formValues[name]}
          required
        />
      )),
    [inputObjects, formValues]
  )

  const disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Create new Author'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        {FormInputs}
        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
