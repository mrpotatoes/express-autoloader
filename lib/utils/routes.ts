import { asyncHandler } from './asyncHandler'
import { pathCache, trim } from './formatters'
import { METHOD } from '../types/constants'

/**
 * Register route with Express.
 * 
 * TODO: Use correct express types
 * TODO: Apply middlewares
 * TODO: Apply versions
 * TODO: Apply prod/dev
 * TODO: Check if it starts with a slash, toss out a warning otherwise.
 */

// TODO: BAD, DELETE
const paths = []

export const registerRoute = (app, route) => {
  const pathExists = paths.some(e => e.path === pathCache(route).path)

  // Does this path already exist? Throw an error. This is a dev-time check.
  if (pathExists) {
    throw new Error(`Route "${route.path}" already exists`)
  } else {
    paths.push(pathCache(route))
  }

  // TODO: Move this function to utils
  const expressMethod = METHOD[route.method].toLocaleLowerCase()

  // TODO: How add middlewares.
  const handler = asyncHandler(route.dependencies, route.handler, route.error)
  app[expressMethod](`/${trim(route.path, '/')}`, handler)
}

// Get the route (use memo here eventually)
export const route = (module, key) => module[key]()

// Pulls out relevant route info
export const routeFn = (app, module) => Object.keys(module).map(k => {
  registerRoute(app, route(module, k))

  return {
    method: route(module, k).method,
    path: route(module, k).path,
  }
})
