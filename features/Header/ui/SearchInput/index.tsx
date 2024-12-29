import type { InputHTMLAttributes } from 'react'
import Button from '../../../../shared/ui/Button'
import styles from './styles.module.css'

type Props = InputHTMLAttributes<HTMLInputElement>

export default function Input(props: Props) {
  return (
    <div className={styles.inputContainer}>
      <input className={styles.input} {...props} />
      <Button
        style={{
          width: 80,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          paddingInline: 0,
          height: 24,
          boxShadow:
            ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 2px 0px 4px 0px var(--blue)',
        }}
        text={'Искать'}
      />
    </div>
  )
}
