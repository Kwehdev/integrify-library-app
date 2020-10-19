import request, { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { validateFormInput } from '../../helpers/validateFormInput'
import useAuth from '../../hooks/useAuth'
import Form from '../Form'
import FormFieldSet from '../FormFieldSet'
import FormInput from '../FormInput'
import FormSubmitBtn from '../FormSubmitBtn/FormSubmitBtn'

const initialState = {
  username: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  email: '',
}

const inputObjects = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username...',
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email...',
  },
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name...',
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name...',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password...',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password...',
  },
]

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [formStatus, setFormStatus] = useState(
    'Please enter the following information.'
  )

  const { reAuthenticate, register } = useAuth()
  const router = useRouter()

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    let error = ''
    if (name === 'confirmPassword') {
      error = validateFormInput(name, value, formValues.password)
    } else {
      error = validateFormInput(name, value)
    }
    ev.target.setCustomValidity(error)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    try {
      await register(formValues)
      //Will throw if unsuccessful.
      setFormStatus('Registered Successfully. You will be redirected shortly.')
      await router.push('/')
      await reAuthenticate()
    } catch (e) {
      console.log(e)
      setFormStatus(e.response.errors[0].message)
      setLoading(false)
    }
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

  let disabled = loading

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFieldSet
        legendText='Registration Form'
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
