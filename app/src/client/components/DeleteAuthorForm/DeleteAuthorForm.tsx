import request, { gql } from 'graphql-request'
import React, { useMemo, useState } from 'react'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormSelect from '../FormSelect'
import FormSubmitBtn from '../FormSubmitBtn'

export default function AuthorDeleteForm({ authors }) {
  const [loading, setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState('Select an author to delete.')
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

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation DeleteAuthor($authorId: ID) {
        deleteAuthor(authorId: $authorId) {
          _id
          name
        }
      }
    `

    const variables = {
      authorId: selectedAuthorId,
    }

    try {
      const { deleteAuthor } = await request(
        '/api/v1/graphql',
        query,
        variables
      )
      const { _id, name } = deleteAuthor
      setFormStatus(`Author ${name}, ID: ${_id} has been deleted`)
    } catch (e) {
      setFormStatus(e.response.errors[0].message)
    }
    setLoading(false)
  }
  const disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Delete an Author'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        <FormSelect
          defaultOptionText={'Select an author'}
          changeHandler={handleSelectChange}
          optionData={optionData}
        />
        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
