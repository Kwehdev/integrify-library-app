import styles from './FormSubmitBtn.module.css'

type FormSubmitBtnProps = {
  submitText?: string
}

export default function FormSubmitBtn({ submitText }: FormSubmitBtnProps) {
  return (
    <input
      className={styles.formSubmitBtn}
      type='submit'
      value={submitText ? submitText : 'Submit'}
    ></input>
  )
}
