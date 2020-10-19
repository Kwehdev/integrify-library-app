import styles from './FormFieldSet.module.css'

type FormFieldSetProps = {
  children: any
  disabled: boolean
  withBorder: boolean
  legendText?: string
  statusText?: string
}

export default function FormFieldSet({
  children,
  disabled,
  withBorder,
  legendText,
  statusText,
}: FormFieldSetProps) {
  return (
    <fieldset
      className={
        withBorder
          ? styles.fieldset
          : `${styles.fieldset} ${styles.fieldset__noBorder}`
      }
      disabled={disabled}
    >
      {legendText && <legend className={styles.legend}>{legendText}</legend>}
      {statusText && <p className={styles.status}>{statusText}</p>}
      <div className={styles.formContent}>{children}</div>
    </fieldset>
  )
}
