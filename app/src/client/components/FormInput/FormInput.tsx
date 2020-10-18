import styles from './FormInput.module.css'

export default function FormInput({
  type,
  name,
  placeholder,
  onChange,
  value,
  required,
}) {
  return (
    <input
      className={styles.formInput}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      aria-label={`Input for ${name}`}
      required={required}
    />
  )
}
