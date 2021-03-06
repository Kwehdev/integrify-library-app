const usernameRegex = '^\\w{4,12}$'
const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,32}$'
const emailRegex =
  '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$'

export const areLoginUserInputsValid = ({ username, password }): boolean => {
  return username &&
    username.match(usernameRegex) &&
    password &&
    password.match(passwordRegex)
    ? true
    : false
}

export const areRegisterUserInputsValid = ({
  username,
  password,
  confirmPassword,
  firstName,
  lastName,
  email,
}): boolean => {
  //Ensure all inputs exist & are valid
  return username &&
    username.match(usernameRegex) &&
    password &&
    password.match(passwordRegex) &&
    confirmPassword &&
    confirmPassword === password &&
    firstName &&
    firstName.length >= 1 &&
    firstName.length <= 24 &&
    lastName &&
    lastName.length >= 1 &&
    lastName.length <= 24 &&
    email &&
    email.match(emailRegex)
    ? true
    : false
}

export const areUpdateUserProfileInputsValid = ({
  email,
  firstName,
  lastName,
}) => {
  if (!email && !firstName && !lastName) return false

  if (email && !email.match(emailRegex)) {
    return false
  }

  if (
    (firstName && firstName.length < 1) ||
    (firstName && firstName.length > 24)
  ) {
    return false
  }
  if ((lastName && lastName.length < 1) || (lastName && lastName.length > 24)) {
    return false
  }
  return true
}

export const areUpdateUserPasswordInputsValid = ({
  newPassword,
  confirmNewPassword,
}) => {
  return newPassword &&
    newPassword.match(passwordRegex) &&
    newPassword === confirmNewPassword
    ? true
    : false
}
