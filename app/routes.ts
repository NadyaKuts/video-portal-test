import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('meRoute', 'routes/meRoute.tsx'),
] satisfies RouteConfig
