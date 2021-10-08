/* eslint-disable @typescript-eslint/ban-types */
import * as O from 'fp-ts/Option'
import * as R from 'fp-ts/Record'
import { Express } from 'express'
import { METHOD } from '../types/constants'
import { Route } from '../types/routes'
import { asyncHandler } from './asyncHandler'
import { pathCache, trim } from './formatters'
import { PathOutput, Module, PathItem } from '../types/misc'

// TODO: BAD, DELETE
const paths: PathItem[] = []

// Get the route (use memo here eventually)
export const route = (module: Module, key: string) => module[key]()

/**
 * Register route with Express.
 * 
 * TODO: Apply middlewares
 */

export const registerRoute = <T extends object>(app: any, route: Route<T>): boolean => {
  // TODO: This could be a Maybe()
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

  const expressMethod = METHOD[route.method].toLocaleLowerCase()
  const handler = asyncHandler(route.dependencies, route.run, route.error)

  app[expressMethod](`/${trim(route.path)}`, handler)

  return true
}

// Pulls out relevant route info
export const routeFn = (app: Express, module): O.Option<PathOutput>[] =>
  R.keys(module).map(k => (
    !registerRoute(app, route(module, k))
      ? O.none
      : O.some({
        method: route(module, k).method,
        path: route(module, k).path,
      })
  ))
