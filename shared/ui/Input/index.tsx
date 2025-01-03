import type { InputHTMLAttributes } from 'react'
import styles from './styles.module.css'

type Props = {
  label?: string
  hasError?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default function vInput({ label, hasError, ...props }: Props) {
  return (
    <div>
      {!!label && <p className={styles.label}>{label}</p>}
      <div>
        <input className={styles.input} {...props} />
        {!!hasError && <div className={styles.error} />}
      </div>
    </div>
  )
}
