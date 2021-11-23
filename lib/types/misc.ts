import * as O from 'fp-ts/Option'
import { Request, Response } from 'express'
import { JSONResponse } from '../types/routes'

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

export type LoggerFn = (url: string, data: any) => void

export type Logger = {
  pass: LoggerFn
  fail: LoggerFn
  warn?: LoggerFn
}

export interface Dependencies {
  req?: Request
  res?: Response
  error?: (deps: any) => Promise<JSONResponse>
  logger?: Logger
}

export type RouteOpt = O.Option<PathOutput>[]

export type Requireable = [boolean, boolean, boolean]
