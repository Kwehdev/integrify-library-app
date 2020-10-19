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
}

const inputObjects = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username...',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password...',
  },
]

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState(initialState)
  const [formStatus, setFormStatus] = useState(
    'Please enter the following information.'
  )

  const { reAuthenticate, login } = useAuth()
  const router = useRouter()

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
    let error = validateFormInput(name, value)
    ev.target.setCustomValidity(error)
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setLoading(true)

    try {
      await login(formValues)
      //Will throw if unsuccessful.
      setFormStatus('Logged In Successfully. You will be redirected shortly.')
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
        legendText='Login Form'
        statusText={formStatus}
        disabled={disabled}
      >
        {FormInputs}
        <FormSubmitBtn />
      </FormFieldSet>
    </Form>
  )
}
