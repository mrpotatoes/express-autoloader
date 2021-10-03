import fs from 'fs'
import path from 'path'

export const allFiles = (directory, rec) => {
  const filesInDirectory = fs.readdirSync(directory)
  let files: string[] = []

  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file)

    if (rec && fs.statSync(absolute).isDirectory()) {
      // console.log(absolute)
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