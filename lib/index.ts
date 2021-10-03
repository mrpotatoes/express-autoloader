/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: Convert to use fp-ts
// TODO: Re-org this directory

import fs from 'fs'
import path from 'path'

// TODO: Fix the tsconfig-paths so this doesn't break again.
import { allFiles } from './utils/files'
import { asyncThing } from './safeHandler'
import { METHOD } from './types/constants'

// TODO: Make this a dep to be passed around.
// TODO: This will need to become immutable eventually.
const paths = []

export const trim = (string, charToRemove) => {
  while (string.charAt(0) == charToRemove) {
    string = string.substring(1)
  }

  while (string.charAt(string.length - 1) == charToRemove) {
    string = string.substring(0, string.length - 1)
  }

  return string
}

// TODO: Put into a utils file.
const toType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
const pathCache = (route) => ({
  path: `${METHOD[route.method]}.${trim(route.path, '/')}`,
  curl: `curl -X ${METHOD[route.method]} http://localhost:2121/${trim(route.path, '/')}`,
})

/**
 * Register route with Express.
 * 
 * TODO: Use correct express types
 * TODO: Apply middlewares
 * TODO: Apply versions
 * TODO: Apply prod/dev
 * TODO: Check if it starts with a slash, toss out a warning otherwise.
 */
const registerRoute = (app, route) => {
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
  app[expressMethod](`/${trim(route.path, '/')}`, asyncThing(route.handler, route.error))
}

// Get the route (use memo here eventually)
const route = (module, key) => module[key]()

// Pulls out relevant route info
const routeFn = (app, module) => Object.keys(module).map(k => {
  registerRoute(app, route(module, k))

  return {
    method: route(module, k).method,
    path: route(module, k).path,
  }
})

const fileResolved = (file) => path.resolve(file)

// TODO: Do this with a pipe() from fp-ts
const fileRequire = (file: string) => ({
  isFile: fs.statSync(fileResolved(file)).isFile(),
  isSource: ['.js', '.ts'].indexOf(path.extname(fileResolved(file)).toLowerCase()) !== -1,
  isLegit: path.basename(fileResolved(file)).substr(0, 1) !== '.',
})

const isValidRequireable = (file) => {
  const deets = fileRequire(file)

  return deets.isFile && deets.isSource && deets.isLegit
}

/**
 * Return files included + paths.
 * @param app 
 * @param loadPath 
 * @param recursive 
 */
export const RoutesLoader = (app, loadPath: string, recursive: boolean) => {
  const files = allFiles(loadPath, recursive)

  // TODO: Make this functional.
  for (const entry of files) {
    if (isValidRequireable(entry)) {
      const module = require(entry)

      if (toType(module) === 'object') {
        routeFn(app, module)
      }
    }
  }

  return paths
}
