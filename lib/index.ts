/* eslint-disable @typescript-eslint/no-var-requires */
// TODO: Convert to use fp-ts
// TODO: Fix the tsconfig-paths so this doesn't break again.
import { allFiles, isValidRequireable } from './utils/files'
import { routeFn } from './utils/routes'

// TODO: Put into a utils file.
const toType = (obj) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

/**
 * Return files included + paths.
 * @param app 
 * @param loadPath 
 * @param recursive 
 */
export const RoutesLoader = (app, loadPath: string, recursive: boolean) => {
  // TODO: Make this a dep to be passed around.
  // TODO: This will need to become immutable eventually.
  const paths = []
  const files = allFiles(loadPath, recursive)

  // TODO: Make this functional.
  for (const entry of files) {
    if (isValidRequireable(entry)) {
      const module = require(entry)

      if (toType(module) === 'object') {
        paths.push(...routeFn(app, module))
      }
    }
  }

  return paths
}
