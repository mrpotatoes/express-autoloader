/* eslint-disable @typescript-eslint/ban-types */
import * as O from 'fp-ts/Option'
import * as R from 'fp-ts/Record'
import * as log from './logger'
import { Express } from 'express'
import { METHOD } from '../types/constants'
import { Route } from '../types/routes'
import { Dependencies } from '../types/misc'
import { asyncHandler } from './asyncHandler'
import { pathCache, trim } from './formatters'
import { PathOutput, Module, PathItem } from '../types/misc'

// TODO: BAD, DELETE
const paths: PathItem[] = []

export const route = (module: Module, key: string) => module[key]()

export const mergedDependencies = <T extends object>(route: Route<T>, overrides: Dependencies) => ({
  ...route.dependencies,
  ...overrides,
  logger: {
    ...log,
    ...overrides.logger,
  },
})

/**
 * Register route with Express.
 * 
 * TODO: Apply middlewares
 */
export const registerRoute = <T extends object>(app: Express, route: Route<T>, config: Dependencies): boolean => {
  if (route.prodExclude) {
    return false
  }

  const pathExists: boolean = paths.some(e => e.path === pathCache(route).path)

  // Does this path already exist? Throw an error. This is a dev-time check.
  if (pathExists) {
    throw new Error(`Route "${route.path}" already exists`)
  } else {
    paths.push(pathCache(route))
  }

  const deps = mergedDependencies(route, config)
  const expressMethod = METHOD[route.method].toLocaleLowerCase()
  const errorHandler = route.error || config.error
  const handler = asyncHandler(deps, route.run, errorHandler)

  app[expressMethod](`/${trim(route.path)}`, handler)

  return true
}

// Pulls out relevant route info
export const routeFn = (app: Express, module: any, config: Dependencies): O.Option<PathOutput>[] =>
  R.keys(module).map(k => (
    !registerRoute(app, route(module, k), config)
      ? O.none
      : O.some({
        method: route(module, k).method,
        path: route(module, k).path,
      })
  ))
