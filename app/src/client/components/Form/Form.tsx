import styles from './Form.module.css'

export default function Form({ children, handleSubmit }) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
