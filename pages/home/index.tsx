import VideoCard from 'entities/VideoCard'
import Header from 'features/Header'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import type { YouTubeVideo } from './types'

export function Welcome() {
  const [data, setData] = useState<YouTubeVideo[]>([])

  const getData = async () => {
    try {
      const data = await import('./response.json')
      setData(data.items satisfies YouTubeVideo[])
    } catch {
      console.log('error')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.list}>
          {data.map((item) => (
            <VideoCard item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

