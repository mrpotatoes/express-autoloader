import fs from 'fs'
import path from 'path'
import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'

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

// TODO: Do this with a pipe() from fp-ts
export const fileRequire = (resolved) => ([
  fs.statSync(resolved).isFile(),
  ['.js', '.ts'].indexOf(path.extname(resolved).toLowerCase()) !== -1,
  path.basename(resolved).substr(0, 1) !== '.',
])

export const isValidRequireable = (file: string) => pipe(
  fileRequire(fileResolved(file)),
  A.every(pred))
