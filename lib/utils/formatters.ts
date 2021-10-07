import { METHOD } from '../types/constants'
import { Route } from '../types/routes'
import { PathItem } from '../types/misc'

export const trim = (string: string, charToRemove: string): string => {
  while (string.charAt(0) == charToRemove) {
    string = string.substring(1)
  }

  while (string.charAt(string.length - 1) == charToRemove) {
    string = string.substring(0, string.length - 1)
  }

  return string
}

export const curl = (method: string, path: string): string =>
  `curl -X ${METHOD[method]} http://localhost:2121/${trim(path, '/')}`

export const pathCache = (route: Route<any>): PathItem => ({
  path: `${METHOD[route.method]}.${trim(route.path, '/')}`,
  curl: `curl -X ${METHOD[route.method]} http://localhost:2121/${trim(route.path, '/')}`,
})
