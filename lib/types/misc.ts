import * as O from 'fp-ts/Option'
import { Request, Response } from 'express'

export type Module = {
  [name: string]: () => any
}

export type PathItem = {
  path: string
  curl: string
}

export type PathOutput = {
  method: string
  path: string
}

export type Transform = {
  method: string
  path: string
}

export interface Dependencies {
  req?: Request
  res?: Response
}

export type RouteOpt = O.Option<PathOutput>[]

export type Requireable = [boolean, boolean, boolean]
