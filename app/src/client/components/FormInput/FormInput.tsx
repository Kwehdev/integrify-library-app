import styles from './FormInput.module.css'

type FormInputProps = {
  type: string
  name: string
  placeholder?: string
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  required?: boolean
}

export default function FormInput({
  type,
  name,
  placeholder,
  onChange,
  value,
  required,
  ...rest
}: FormInputProps) {
  return (
    <input
      className={
        required
          ? `${styles.formInput} ${styles.formInput__validate}`
          : styles.formInput
      }
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      aria-label={`Input for ${name}`}
      required={required}
      {...rest}
    />
  )
}
