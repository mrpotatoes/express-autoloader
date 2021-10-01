/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: Convert to use fp-ts
// TODO: Re-org this directory
import fs from 'fs'
import path from 'path'

// TODO: Fix the tsconfig-paths so this doesn't break again.
import { walk } from './walker'
import { METHOD } from './lib/stuff'
import { Route } from './types/routes'

// TODO: Put into a utils file.
const toType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
const pathCache = (route) => `${METHOD[route.method]}.${route.path}`

// TODO: Make this a dep to be passed around.
// TODO: This will need to become immutable eventually.
let paths = []

/**
 * https://github.com/imcooder/express-autoload-router/blob/master/index.js
 * 
 * Register route with Express.
 * 
 * TODO: Use correct express types
 * TODO: Apply middlewares
 * TODO: Apply versions
 * TODO: Apply prod/dev
 * TODO: Check if it starts with a slash, toss out a warning otherwise.
 */
const registerRoute = (app, route: Route) => {
  // Does this path already exist? Throw an error. This is a dev-time check.
  if (paths.includes(pathCache(route))) {
    throw new Error(`Route "${route.path}" already exists`)
  } else {
    paths.push(pathCache(route))
  }

  // TODO: Move this function to utils
  const expressMethod = METHOD[route.method].toLocaleLowerCase()

  // TODO: Make this async
  // TODO: How add middlewares.
  app[expressMethod](`/${route.path}`, route.handler);
}

// Get the route (use memo here eventually)
const route = (module, key) => module[key]()

// Pulls out relevant route info
const routeFn = (app, module) =>
  Object.keys(module).map(k => {
    registerRoute(app, route(module, k))

    return {
      method: route(module, k).method,
      path: route(module, k).path,
    }
  })

/**
 * Return files included + paths.
 * @param app 
 * @param loadPath 
 * @param recursive 
 */
export const RoutesLoader = (app, loadPath: string, recursive: boolean) => {
  const files = (recursive ? walk(loadPath) : fs.readdirSync(loadPath));

  // TODO: Make this functional.
  for (const entry of files) {
    const file = (recursive ? path.resolve(entry) : path.resolve(loadPath, entry))
    const isFile = fs.statSync(file).isFile()
    const isSource = ['.js', '.ts'].indexOf(path.extname(file).toLowerCase()) !== -1
    const isLegit = path.basename(file).substr(0, 1) !== '.'

    if (isFile && isSource && isLegit) {
      try {
        const module = require(file);
        const isObject = toType(module) === 'object'

        if (isObject) {
          const route = routeFn(app, module)
          // const simplePath = file.replace('/Users/mma1083/Projects/autoloader/dist/', '')
          // console.log(simplePath, route)
          // console.log('--------')
          // console.log()
        }
      } catch (e) {
        throw new Error(e.toString());
      }
    }
  }

  console.log(paths)
}
