import { Welcome } from '../../pages/home'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Video Portal' },
    { name: 'description', content: 'Welcome to Video Portal!' },
  ]
}

export default function Home() {
  return <Welcome />
}
