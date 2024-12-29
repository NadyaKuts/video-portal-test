import type { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

type Props = {
  icon?: string
  text?: string | number
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
  return (
    <button className={styles.container} {...props}>
      {props.text}
    </button>
  )
}
