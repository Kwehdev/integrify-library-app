import request, { gql } from 'graphql-request'
import React, { useMemo, useState } from 'react'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import FormSubmitBtn from '../FormSubmitBtn'

const initialState = {
  name: '',
}

export default function AuthorUpdateForm({ authors }) {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [formStatus, setFormStatus] = useState('Select an author and update.')
  const [selectedAuthorId, setSelectedAuthorId] = useState(null)

  const optionData = useMemo(
    () =>
      authors.map(({ _id, name }) => ({
        value: _id,
        toDisplay: name,
      })),
    [authors]
  )
  const handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = ev.target
    setSelectedAuthorId(value)
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation UpdateAuthor($authorId: ID, $author: AuthorUpdateInput) {
        updateAuthor(authorId: $authorId, author: $author) {
          _id
          name
        }
      }
    `

    const variables = {
      authorId: selectedAuthorId,
      author: formValues,
    }

    try {
      const { updateAuthor } = await request(
        '/api/v1/graphql',
        query,
        variables
      )
      const { _id, name } = updateAuthor
      setFormStatus(`Author ${name}, ID: ${_id} has been updated.`)
    } catch (e) {
      setFormStatus(e.response.errors[0].message)
    }
    setLoading(false)
  }
  const disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Update an Author'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        <FormSelect
          changeHandler={handleSelectChange}
          optionData={optionData}
        />
        <FormInput
          key={`Input name`}
          type='text'
          name='name'
          placeholder='Updated name...'
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
