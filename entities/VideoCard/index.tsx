import dayjs from 'dayjs'
import { useMemo, useRef } from 'react'
import { Link } from 'react-router'
import type { Video } from 'shared/api/types'
import colors from 'shared/constants/colors'
import routes from 'shared/constants/routes'
import Button from 'shared/ui/Button'
import back from './back_button.png'
import styles from './styles.module.css'
import IconBar, { type IconBarProps } from './ui/IconBar'
import VideoPreview from './ui/VideoPreview'

type Props = {
  fullInfo?: boolean
  item: Video
}

export default function VideoCard({ item, fullInfo }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const icons: IconBarProps['data'] = [
    { icon: 'viewed', counter: item.statistics.viewCount },
    { icon: 'liked', counter: item.statistics.likeCount },
    { icon: 'dislike', counter: item.statistics.commentCount },
    { icon: 'comments', counter: item.statistics.commentCount },
  ]

  const videoColor = useMemo(() => {
    {
      const publishedAt = dayjs(item.snippet.publishedAt)
      const now = dayjs()

      const monthAgo = now.diff(publishedAt, 'month')
      const daysAgo = now.diff(publishedAt, 'days')
      if (daysAgo < 7) return colors.blue
      if (monthAgo < 1) return colors.green
      if (monthAgo < 6) return colors.yellow
      return colors.red
    }
  }, [])

  if (fullInfo)
    return (
      <div className={styles.fullInfoContainer}>
        <Link to={routes.main}>
          <img className={styles.arrowBack} src={back} />
        </Link>
        <div className={styles.videoInfo}>
          <VideoPreview fullInfo src={item.snippet.thumbnails.high.url} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div className={styles.videoDescription}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 15,
                }}
              >
                <p className={styles.title}>{item.snippet.title}</p>
                <p className={styles.fullDate}>
                  {dayjs(item.snippet.publishedAt).format('dddd, MMMM D, YYYY')}
                </p>
              </div>
              <p style={{ fontSize: 14, color: colors.black }}>Описание:</p>
              <p className={styles.description}>{item.snippet.description}</p>
            </div>
            <IconBar data={icons} />
            <div
              className={styles.line}
              style={{ backgroundColor: videoColor }}
            />
          </div>
        </div>
      </div>
    )

  return (
    <div className={styles.container}>
      <VideoPreview src={item.snippet.thumbnails.medium.url} />
      <IconBar data={icons} />
      <div style={{ height: 84, overflow: 'hidden' }}>
        <div className={styles.name} ref={ref}>
          {item.snippet.title}
        </div>
        <p className={styles.date}>
          {dayjs(item.snippet.publishedAt).format('DD.MM.YYYY')}
        </p>
      </div>
      <Link to={routes.videoInfo(item.id)}>
        <Button
          style={{ marginLeft: 71, marginRight: 72, marginBottom: 10 }}
          text={'Далее...'}
        />
      </Link>
      <div className={styles.line} style={{ backgroundColor: videoColor }} />
    </div>
  )
}
