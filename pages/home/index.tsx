import VideoCard from 'entities/VideoCard'
import Header from 'features/Header'
import { useEffect } from 'react'
import colors from 'shared/constants/colors'
import { useDispatch, useSelector, type RootState } from 'shared/redux/store'
import {
  fetchVideos,
  setCurrentPage,
  setItemsPerPage,
} from 'shared/redux/videoSlice'
import styles from './styles.module.css'

export function Welcome() {
  const dispatch = useDispatch()
  const {
    loading,
    videos,
    currentPage,
    itemsPerPage,
    sortBy,
    sortOrder,
    filter,
    error,
  } = useSelector((state: RootState) => state.videos)

  useEffect(() => {
    dispatch(fetchVideos())
  }, [dispatch])

  const sortedVideos = [...videos].sort((a, b) => {
    const aValue =
      sortBy === 'date'
        ? new Date(a.snippet.publishedAt).getTime()
        : parseInt(a.statistics.viewCount)
    const bValue =
      sortBy === 'date'
        ? new Date(b.snippet.publishedAt).getTime()
        : parseInt(b.statistics.viewCount)
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
  })

  const filteredVideos = sortedVideos.filter((video) =>
    video.snippet.title.toLowerCase().includes(filter.toLowerCase())
  )

  const displayedVideos =
    loading || error
      ? []
      : filteredVideos.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage)

  const perPage = [12, 20, 36, 56]

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.list}>
          {!!loading && <div>Loading...</div>}
          {!!error && <div>Error: {error}</div>}
          {displayedVideos?.map((item) => (
            <VideoCard item={item} key={item.id} />
          ))}
        </div>
        {!!displayedVideos.length && (
          <div className={styles.pagination}>
            <div className={styles.pages}>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  className={styles.pages}
                  key={index + 1}
                  onClick={() => dispatch(setCurrentPage(index + 1))}
                  style={{
                    border:
                      index + 1 === currentPage
                        ? `${colors.blue} 1px solid`
                        : 'none',
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <select
              className={styles.select}
              onChange={(e) =>
                dispatch(setItemsPerPage(Number(e.target.value)))
              }
              value={itemsPerPage}
            >
              {perPage.map((item) => (
                <option key={item} value={item}>
                  {item}/page
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
