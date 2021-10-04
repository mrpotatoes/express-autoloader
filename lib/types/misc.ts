// TODO: Misc for now until I figure out how I want to organize these.

export type Module = {
  [name: string]: () => any
  // [name: string]: <T extends object>() => Route<T>
}

export type PathItem = {
  path: string
  curl: string
}

export type PathOutput = {
  method: string
  path: string
}

export type FilePredicates = {
  isFile: boolean
  isSource: boolean
  isLegit: boolean
}