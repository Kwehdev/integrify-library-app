import request, { gql } from 'graphql-request'
import React, { useMemo, useState } from 'react'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import FormSubmitBtn from '../FormSubmitBtn'
import FormTextArea from '../FormTextArea'

const initialState = {
  ISBN: '',
  imageURI: '',
  title: '',
  description: '',
  status: 'Available',
  authors: [],
  publisher: '',
  publishedDate: '',
  genre: ['Fantasy'],
}
export default function UpdateBookForm({ authors, books }) {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [formStatus, setFormStatus] = useState('Select a book and update.')
  const [selectedBookId, setSelectedBookId] = useState(null)

  const bookOptionData = useMemo(
    () =>
      books.map(({ _id, title }) => ({
        value: _id,
        toDisplay: title,
      })),
    [authors]
  )

  const authorOptionData = useMemo(
    () =>
      authors.map(({ _id, name }) => ({
        value: _id,
        toDisplay: name,
      })),
    books
  )

  const handleBookSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = ev.target
    setSelectedBookId(value)
  }

  const handleAuthorSelectChange = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = ev.target
    setFormValues((prev) => ({ ...prev, authors: [value] }))
  }

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation UpdateBook($bookId: ID, $book: BookUpdateInput) {
        updateBook(bookId: $bookId, book: $book) {
          _id
          title
        }
      }
    `

    const {
      ISBN,
      title,
      description,
      authors,
      publisher,
      publishedDate,
      imageURI,
    } = formValues

    const filteredValues = {
      ...(ISBN && { ISBN }),
      ...(title && { title }),
      ...(description && { description }),
      ...(publisher && { publisher }),
      ...(imageURI && { imageURI }),
      ...(authors.length !== 0 && { authors }),
      ...(publishedDate && { publishedDate }),
    }

    const variables = {
      bookId: selectedBookId,
      book: filteredValues,
    }

    try {
      const { updateBook } = await request('/api/v1/graphql', query, variables)
      const { _id, title } = updateBook
      setFormStatus(`Book ${title}, ID: ${_id} has been updated.`)
    } catch (e) {
      setFormStatus(e.response.errors[0].message)
    }
    setLoading(false)
  }
  const disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Update a book'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        <FormSelect
          defaultOptionText={'Select a book'}
          changeHandler={handleBookSelectChange}
          optionData={bookOptionData}
        />

        <FormInput
          type='text'
          name='ISBN'
          placeholder={'Update ISBN...'}
          onChange={handleChange}
          value={formValues[name]}
        />
        <FormInput
          type='text'
          name='imageURI'
          placeholder={'Update Image URI...'}
          onChange={handleChange}
          value={formValues[name]}
        />
        <FormInput
          type='text'
          name='title'
          placeholder={'Update Title.....'}
          onChange={handleChange}
          value={formValues[name]}
        />
        <FormTextArea
          name='description'
          onChange={handleChange}
          value={formValues[name]}
          placeholder={'Update Description...'}
        />
        <FormInput
          type='text'
          name='publisher'
          placeholder={'Update Publisher...'}
          onChange={handleChange}
          value={formValues[name]}
        />
        <FormInput
          type='text'
          name='publishedDate'
          placeholder={'Update Publication Date.....'}
          onChange={handleChange}
          value={formValues[name]}
        />

        <FormSelect
          defaultOptionText={'Select an author'}
          changeHandler={handleAuthorSelectChange}
          optionData={authorOptionData}
        />

        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
