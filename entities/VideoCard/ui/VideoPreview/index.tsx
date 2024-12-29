import styles from './styles.module.css'

type Props = { src?: string; duration?: string }

export default function VideoPreview({ src }: Props) {
  return <img className={styles.image} src={src} />
}
