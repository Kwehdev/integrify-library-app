import styles from './FormFieldSet.module.css'

export default function FormFieldSet({
  legendText,
  statusText,
  children,
  disabled,
}) {
  return (
    <fieldset className={styles.fieldset} disabled={disabled}>
      <legend className={styles.legend}>{legendText}</legend>
      <p className={styles.status}>{statusText}</p>
      <div className={styles.formContent}>{children}</div>
    </fieldset>
  )
}
