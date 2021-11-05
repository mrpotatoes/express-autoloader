import fs from 'fs'
import path from 'path'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { Requireable } from '../types/misc'

export const pred = (a): boolean => a === true
export const fileResolved = (file: string): string => path.resolve(file)

// TODO: How to convert to functional.
export const allFiles = (directory: string, rec: boolean): string[] => {
  const filesInDirectory = fs.readdirSync(directory)
  let files: string[] = []

  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file)

    if (rec && fs.statSync(absolute).isDirectory()) {
      files = files.concat(allFiles(absolute, rec))
    } else {
      const regex = new RegExp('routes?.(ts|js)')
      const isRoute = regex.test(file)

      if (isRoute) {
        files.push(absolute)
      }
    }
  }

  return files
}

export const fileRequire = (resolved: string): Requireable => ([
  fs.statSync(resolved).isFile(),
  ['.js', '.ts'].indexOf(path.extname(resolved).toLowerCase()) !== -1,
  path.basename(resolved).substr(0, 1) !== '.',
])

export const isValidRequireable = (file: string): boolean => pipe(
  fileRequire(fileResolved(file)),
  A.every(pred))
