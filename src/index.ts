/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'
import express, { Router } from "express";

// import compose from './lib/compose';
// import applyMethod from './applyMethod';

const toType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

const walk = (dir: string) => {
  // eslint-disable-next-line functional/prefer-readonly-type
  let results: string[] = [];
  const list = fs.readdirSync(dir)
  list.forEach((file: string) => {
    file = dir + '/' + file
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  })
  return results;
}

/**
 * https://github.com/imcooder/express-autoload-router/blob/master/index.js
 * 
 * Register route with Express.
 */
const registerRoute = () => {
  // Does this path already exist? Throw an error. This is a dev-time thing so it doesn't bother me as much.
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
  Object.keys(module).map(k => ({
    method: route(module, k).method,
    path: route(module, k).path,
  }))

function RoutesLoader(loadPath: string, recursive: boolean): Router {
  // const express = require('express');
  let router = express.Router();

  if (!loadPath) loadPath = './routes';

  const files = (recursive ? walk(loadPath) : fs.readdirSync(loadPath));

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
          console.log(simplePath, route)
          console.log('--------')
          console.log()
          // console.log(module.api)
          // router = (module.default || module)(router);
        }
      } catch (e) {
        throw new Error("Error when loading route file: " + file + " [" + e.toString() + "]");
      }
    }

  }

  return router;
}

// Use `path.join(__dirname, 'path/to/folder')` here
// loadRouter(app, '/api', path.join(__dirname, '_routes'));

RoutesLoader(path.join(__dirname, '_routes'), true)
