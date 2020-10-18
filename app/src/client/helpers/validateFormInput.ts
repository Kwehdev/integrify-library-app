const usernameRegex = new RegExp('^\\w{4,12}$')

const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,32}$'
)

const emailRegex = new RegExp(
  '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'
)

export const validateFormInput = (
  key: string,
  value: string,
  comparedValue?: string
) => {
  switch (key) {
    case 'username':
      return usernameRegex.test(value)
        ? ''
        : 'Username must be between 4-12 characters, and contain no special characters'
    case 'email':
      return emailRegex.test(value)
        ? ''
        : 'Invalid Email format, example: yourname@email.com'
    case 'password':
      return passwordRegex.test(value)
        ? ''
        : 'Password must be between 8-32 Characters, and must contain at least one uppercase letter and one number'
    case 'confirmPassword':
      return value === comparedValue ? '' : 'Passwords do not match'
    case 'firstName':
    case 'lastName':
      return value.length >= 1 && value.length <= 24
        ? ''
        : 'First and last name must be between 1 and 24 characters.'
    default:
      return 'Unknown Error.'
  }
}
