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

export default function BookCreationForm({ authors }) {
  const [formValues, setFormValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [formStatus, setFormStatus] = useState(
    'Please fill in the required fields.'
  )

  const optionData = useMemo(
    () =>
      authors.map(({ _id, name }) => ({
        value: _id,
        toDisplay: name,
      })),
    [authors]
  )

  const handleChange = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = ev.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = ev.target
    setFormValues((prev) => ({ ...prev, authors: [value] }))
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    const query = gql`
      mutation CreateBook($book: BookCreateInput) {
        createBook(book: $book) {
          _id
          title
        }
      }
    `

    const variables = {
      book: formValues,
    }

    try {
      const { createBook } = await request('/api/v1/graphql', query, variables)
      const { _id, title } = createBook
      setFormStatus(
        `Book ${title} has been created successfully under ID: ${_id}`
      )
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }

  const disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Create new Book'
        statusText={formStatus}
        disabled={disabled}
        withBorder={true}
      >
        <FormInput
          type='text'
          name='ISBN'
          placeholder={'ISBN...'}
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormInput
          type='text'
          name='imageURI'
          placeholder={'Image URI...'}
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormInput
          type='text'
          name='title'
          placeholder={'Title.....'}
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormTextArea
          name='description'
          onChange={handleChange}
          value={formValues[name]}
          placeholder={'Description...'}
          required
        />
        <FormInput
          type='text'
          name='publisher'
          placeholder={'Publisher...'}
          onChange={handleChange}
          value={formValues[name]}
          required
        />
        <FormInput
          type='text'
          name='publishedDate'
          placeholder={'Publication Date.....'}
          onChange={handleChange}
          value={formValues[name]}
          required
        />

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
