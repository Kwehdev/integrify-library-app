import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendEmail = async (email: Email) => {
  console.log('sending')
  try {
    await sgMail.send(email)
  } catch (err) {
    console.error(err)
  }
}

type EmailConstructor = (
  firstName: string,
  email: string,
  resetToken: string,
  resetTokenExpiry: number
) => Email

type Email = {
  to: string
  from: string
  subject: string
  html: string
}

//In future this will be an endpoint to reset a password.
export const constructPasswordRequestEmail: EmailConstructor = (
  firstName,
  email,
  resetToken,
  resetTokenExpiry
) => {
  return {
    to: email,
    from: 'kwehdev@protonmail.com',
    subject: 'Your LibraryApp password reset request',
    html: `<h4>Hello, ${firstName},
    We recently received a request to reset your password.
    Access token: ${resetToken},
    Expires In: ${resetTokenExpiry}
    `,
  }
}
