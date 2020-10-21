import React, { useState } from 'react'
import useBooks from '../../hooks/useBooks'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormInput from '../FormInput'
import FormSubmitBtn from '../FormSubmitBtn/FormSubmitBtn'
import styles from './FilterMenu.module.css'

const initialState = {
  title: '',
  ISBN: '',
  author: '',
  limit: 0,
}

export default function FilterMenu() {
  const [filterValues, setFilterValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const { data, updateFilters } = useBooks()

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    if (name === 'limit') {
      setFilterValues((prev) => ({ ...prev, [name]: parseInt(value) }))
    } else {
      setFilterValues((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)
    await updateFilters(filterValues)
    setLoading(false)
    console.log(data)
  }

  const disabled = loading

  return (
    <div className={styles.container}>
      <Form handleSubmit={handleSubmit}>
        <FormFieldSet
          statusText={'Filter results'}
          withBorder={false}
          disabled={disabled}
        >
          <FormInput
            type={'text'}
            name={'title'}
            placeholder={'Title...'}
            onChange={handleInputChange}
            value={filterValues[name]}
            required={false}
          />

          <FormInput
            type={'text'}
            name={'ISBN'}
            placeholder={'ISBN...'}
            onChange={handleInputChange}
            value={filterValues[name]}
            required={false}
          />

          <FormInput
            type={'text'}
            name={'author'}
            placeholder={'Author...'}
            onChange={handleInputChange}
            value={filterValues[name]}
            required={false}
          />

          <FormInput
            type={'number'}
            name={'limit'}
            placeholder={'Max Results...'}
            onChange={handleInputChange}
            value={filterValues[name]}
            required={false}
            min={0}
          />

          <FormSubmitBtn submitText={'Apply Filters'} />
        </FormFieldSet>
      </Form>
    </div>
  )
}
