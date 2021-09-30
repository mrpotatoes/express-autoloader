/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: Convert to use fp-ts
import fs from 'fs'
import path from 'path'
import express, { Router } from 'express'
import { walk } from './walker'
import { chainTaskK } from 'fp-ts/lib/FromTask'

import { METHOD } from './lib/stuff'

// TODO: Put into a utils file.
const toType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
const pathCache = (route) => `${METHOD[route.method]}.${route.path}`

// TODO: This will need to become immutable eventually. 
let paths = []

/**
 * https://github.com/imcooder/express-autoload-router/blob/master/index.js
 * 
 * Register route with Express.
 * 
 * TODO: Use correct express types
 */
const registerRoute = (route) => {
  // Does this path already exist? Throw an error. This is a dev-time check.
  if (paths.includes(pathCache(route))) {
    throw new Error(`Route "${route.path}" already exists`)
  } else {
    paths.push(pathCache(route))
  }

  // if (middlewares.length) {
  //   app[method](url, compose(middlewares, modifiedUrl), handler);
  // } else {
  //   app[method](url, handler);
  // }
}

// Get the route (use memo here eventually)
const route = (module, key) => module[key]()

// Pulls out relevant route info
const routeFn = (module) =>
  Object.keys(module).map(k => {
    registerRoute(route(module, k))

    return {
      method: route(module, k).method,
      path: route(module, k).path,
    }
  })

function RoutesLoader(loadPath: string, recursive: boolean): Router {
  // const express = require('express');
  let router = express.Router();

  if (!loadPath) loadPath = './routes';

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
          const simplePath = file.replace('/Users/mma1083/Projects/autoloader/dist/', '')
          const route = routeFn(module)
          // console.log(simplePath, route)
          // console.log('--------')
          // console.log()
          // console.log(module.api)
          // router = (module.default || module)(router);
        }
      } catch (e) {
        throw new Error(e.toString());
      }
    }

  }

  console.log(paths)
  return router;
}

// Use `path.join(__dirname, 'path/to/folder')` here
// loadRouter(app, '/api', path.join(__dirname, '_routes'));

// TODO: Actually run this with express.js
try {
  RoutesLoader(path.join(__dirname, '_routes'), true)
} catch (error) {
  console.log(error.toString())
}
