import styles from './FormTextArea.module.css'

type FormTextAreaProps = {
  name: string
  placeholder?: string
  onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
  required: boolean
}

export default function FormTextArea({
  name,
  placeholder,
  onChange,
  value,
  required,
  ...rest
}: FormTextAreaProps) {
  return (
    <textarea
      className={styles.textArea}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      required={required}
      {...rest}
    ></textarea>
  )
}
