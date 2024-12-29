import dayjs from 'dayjs'
import type { YouTubeVideo } from 'pages/home/types'
import { useRef } from 'react'
import Button from 'shared/ui/Button'
import styles from './styles.module.css'
import IconBar, { type IconBarProps } from './ui/IconBar'
import VideoPreview from './ui/VideoPreview'

export default function VideoCard({ item }: { item: YouTubeVideo }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const icons = [
    { icon: 'viewed', counter: item.statistics.viewCount },
    { icon: 'liked', counter: item.statistics.likeCount },
    { icon: 'dislike', counter: item.statistics.commentCount },
    { icon: 'comments', counter: item.statistics.commentCount },
  ] satisfies IconBarProps['data']
  return (
    <div className={styles.container}>
      <VideoPreview src={item.snippet.thumbnails.medium.url} />
      <IconBar data={icons} />
      <div style={{ height: 84, overflow: 'hidden' }}>
        <p ref={ref} className={styles.name}>
          {item.snippet.title}
        </p>
        <p
          className={styles.date}
          style={{ display: ref?.current?.clientHeight > 40 ? 'none' : 'flex' }}
        >
          {dayjs(item.snippet.publishedAt).format('DD.MM.YYYY')}
        </p>
      </div>
      <Button
        style={{ marginLeft: 71, marginRight: 72, marginBottom: 10 }}
        text={'Далее...'}
      />
      <div className={styles.line} />
    </div>
  )
}
