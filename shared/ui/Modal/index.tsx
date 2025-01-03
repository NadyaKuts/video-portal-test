import { type ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'

type Props = {
  isOpen?: boolean
  onClose?: () => void
  children?: ReactNode
  title?: string
}

export default function Modal({ isOpen, onClose, children, title }: Props) {
  if (!isOpen) return null

  if (typeof window !== 'undefined' && isOpen)
    return ReactDOM.createPortal(
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modal}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {!!title && <p className={styles.title}>{title}</p>}
          {children}
        </div>
      </div>,
      document.body
    )
}
