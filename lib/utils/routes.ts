import { Express } from 'express'
import { asyncHandler } from './asyncHandler'
import { pathCache, trim } from './formatters'
import { METHOD } from '../types/constants'
import { PathOutput } from '../types/misc'
import { Route } from '../types/routes'

/**
 * Register route with Express.
 * 
 * TODO: Apply middlewares
 * TODO: Apply versions
 * TODO: Apply prod/dev
 */

// TODO: BAD, DELETE
const paths = []

// eslint-disable-next-line @typescript-eslint/ban-types
export const registerRoute = <T extends object>(app: Express, route: Route<T>) => {
  const pathExists: boolean = paths.some(e => e.path === pathCache(route).path)

  // Does this path already exist? Throw an error. This is a dev-time check.
  if (pathExists) {
    throw new Error(`Route "${route.path}" already exists`)
  } else {
    paths.push(pathCache(route))
  }

  const expressMethod = METHOD[route.method].toLocaleLowerCase()

  // TODO: How add middlewares.
  const handler = asyncHandler(route.dependencies, route.run, route.error)
  app[expressMethod](`/${trim(route.path, '/')}`, handler)
}

// Get the route (use memo here eventually)
export const route = (module, key) => module[key]()

// Pulls out relevant route info
export const routeFn = (app: Express, module): PathOutput[] => Object.keys(module).map(k => {
  registerRoute(app, route(module, k))

  return {
    method: route(module, k).method,
    path: route(module, k).path,
  }
})
