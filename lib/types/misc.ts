// TODO: Misc for now until I figure out how I want to organize these.

export type Callback = (any) => any

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
