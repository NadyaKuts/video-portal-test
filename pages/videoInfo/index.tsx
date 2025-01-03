import VideoCard from 'entities/VideoCard'
import Header from 'features/Header'
import NotFound from 'pages/notFound'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector, type RootState } from 'shared/redux/store'
import { fetchVideos } from 'shared/redux/videoSlice'
import styles from './styles.module.css'

export function VideoInfo() {
  const { videoId } = useParams<{ videoId: string }>()
  const dispatch = useDispatch()
  const { videos, loading, error } = useSelector(
    (state: RootState) => state.videos
  )

  useEffect(() => {
    dispatch(fetchVideos())
  }, [dispatch])

  const video = videos.find((item) => item.id === videoId)

  return (
    <div className={styles.container}>
      <Header />
      {loading || videos.length === 0 ? (
        <div>Loading...</div>
      ) : !video || error ? (
        <NotFound />
      ) : (
        <VideoCard fullInfo item={video} />
      )}
    </div>
  )
}
