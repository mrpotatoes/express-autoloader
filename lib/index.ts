// TODO: Fix the tsconfig-paths so this doesn't break again.
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe, } from 'fp-ts/lib/function'
import { Express } from 'express'
import { allFiles, isValidRequireable } from './utils/files'
import { routeFn } from './utils/routes'
import { curl } from './utils/formatters'
import { METHOD } from './types/constants'
import { RouteSimpleTransform } from './types/Routes'
import { Transform, RouteOpt, Module } from './types/misc'

const toType = (obj: Module): string => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

const transform = (a: RouteSimpleTransform): Transform => ({
  method: METHOD[a.method],
  path: curl(METHOD[a.method], a.path),
})

export const isModule = (module: Module): boolean => toType(module) === 'object'

export const routeConfigs = (app: Express) => (prev: RouteOpt, curr: RouteOpt) => ([
  ...prev,
  routeFn(app, curr),
])

/**
 * Return files included + paths.
 */
export const routesLoader = (app: Express, loadPath: string, recursive: boolean): Transform[] =>
  pipe(
    allFiles(loadPath, recursive)
      .filter(isValidRequireable)
      .map(file => require(file))
      .filter(isModule)
      .reduce(routeConfigs(app), [])
      .flat(),
    A.filterMap(O.map(transform))
  )
