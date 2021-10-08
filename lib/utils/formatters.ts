import { METHOD } from '../types/constants'
import { Route } from '../types/routes'
import { PathItem } from '../types/misc'

export const trim = (str: string): string => str.replace(/^\/+|\/+$/g, '')

export const curl = (method: string, path: string): string =>
  `curl -X ${method} http://localhost:2121/${trim(path)}`

// TODO: Do I really need this function anymore?
export const pathCache = (route: Route<any>): PathItem => ({
  path: `${METHOD[route.method]}.${trim(route.path)}`,
  curl: `curl -X ${METHOD[route.method]} http://localhost:2121/${trim(route.path)}`,
})
