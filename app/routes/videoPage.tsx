import { VideoInfo } from 'pages/videoInfo'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Video Info' },
    { name: 'description', content: 'Welcome to Video Portal!' },
  ]
}

export default function Home() {
  return <VideoInfo />
}
