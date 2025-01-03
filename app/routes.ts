import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/:videoId', 'routes/videoPage.tsx'),
] satisfies RouteConfig
