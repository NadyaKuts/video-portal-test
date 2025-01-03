import styles from './styles.module.css'

type Props = { src?: string; fullInfo?: boolean }

export default function VideoPreview({ src, fullInfo }: Props) {
  return (
    <img
      className={styles.image}
      {...(fullInfo && { style: { height: 461, width: 726, margin: 0 } })}
      src={src}
    />
  )
}
