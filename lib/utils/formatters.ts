import { METHOD } from '../types/constants'

export const trim = (string, charToRemove) => {
  while (string.charAt(0) == charToRemove) {
    string = string.substring(1)
  }

  while (string.charAt(string.length - 1) == charToRemove) {
    string = string.substring(0, string.length - 1)
  }

  return string
}

export const pathCache = (route) => ({
  path: `${METHOD[route.method]}.${trim(route.path, '/')}`,
  curl: `curl -X ${METHOD[route.method]} http://localhost:2121/${trim(route.path, '/')}`,
})

export const curl = () => {
  // 
}