import request, { gql } from 'graphql-request'
import React, { useMemo, useState } from 'react'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormSelect from '../FormSelect'
import FormSubmitBtn from '../FormSubmitBtn'

export default function DeleteBookForm({ books }) {
  const [loading, setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState('Select a book to delete.')
  const [selectedBookId, setSelectedBookId] = useState(null)

  const optionData = useMemo(
    () =>
      books.map(({ _id, title }) => ({
        value: _id,
        toDisplay: title,
      })),
    [books]
  )
  const handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = ev.target
    setSelectedBookId(value)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation DeleteBook($bookId: ID) {
        deleteBook(bookId: $bookId) {
          _id
          title
        }
      }
    `

    const variables = {
      bookId: selectedBookId,
    }

    try {
      const { deleteBook } = await request('/api/v1/graphql', query, variables)
      const { _id, title } = deleteBook
      setFormStatus(`Book ${title}, ID: ${_id} has been deleted`)
    } catch (e) {
      setFormStatus(e.response.errors[0].message)
    }
    setLoading(false)
  }
  const disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Delete a book'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        <FormSelect
          defaultOptionText={'Select a book'}
          changeHandler={handleSelectChange}
          optionData={optionData}
        />
        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
