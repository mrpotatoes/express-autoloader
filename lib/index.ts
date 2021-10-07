/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: Convert to use fp-ts
// TODO: Fix the tsconfig-paths so this doesn't break again.
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { pipe, } from 'fp-ts/lib/function'

import { Express } from 'express'
import { allFiles, isValidRequireable } from './utils/files'
import { routeFn } from './utils/routes'
import { curl } from './utils/formatters'
import { METHOD } from './types/constants'
import { Transform } from './types/misc'

const toType = (obj: any): string => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

const transform = (a: any): Transform => ({
  method: METHOD[a.method],
  path: curl(METHOD[a.method], a.path),
})

/**
 * Return files included + paths.
 * @param app 
 * @param loadPath 
 * @param recursive 
 */
export const routesLoader = (app: Express, loadPath: string, recursive: boolean): Transform[] => {
  // TODO: This will need to become immutable eventually.
  const paths = []
  const files = allFiles(loadPath, recursive)
  console.log(files)

  // TODO: Make this functional.
  for (const entry of files) {
    if (isValidRequireable(entry)) {
      const module = require(entry)

      if (toType(module) === 'object') {
        paths.push(...routeFn(app, module))
      }
    }
  }

  return pipe(
    paths,
    A.filterMap(O.map(transform))
  )
}
