import fs from 'fs'
import path from 'path'

export const fileResolved = (file) => path.resolve(file)

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
export const fileRequire = (file: string) => ({
  isFile: fs.statSync(fileResolved(file)).isFile(),
  isSource: ['.js', '.ts'].indexOf(path.extname(fileResolved(file)).toLowerCase()) !== -1,
  isLegit: path.basename(fileResolved(file)).substr(0, 1) !== '.',
})

export const isValidRequireable = (file) => {
  const deets = fileRequire(file)

  return deets.isFile && deets.isSource && deets.isLegit
}