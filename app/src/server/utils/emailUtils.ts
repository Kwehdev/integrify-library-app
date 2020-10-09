export const sendEmail = async (email: Email) => {}

type EmailConstructor = (
  firstName: string,
  email: string,
  resetToken: string,
  resetTokenExpiry: number
) => Email

type Email = {}

export const constructPasswordRequestEmail: EmailConstructor = (
  firstName,
  email,
  resetToken,
  resetTokenExpiry
) => {
  return {}
}
