import type { InputHTMLAttributes } from 'react'
import Button from '../../../../shared/ui/Button'
import styles from './styles.module.css'

type Props = { onSearch?: () => void } & InputHTMLAttributes<HTMLInputElement>

export default function SearchInput({ onSearch, ...props }: Props) {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch?.()
          }
        }}
        onSubmit={onSearch}
        {...props}
      />
      <Button
        onClick={onSearch}
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
