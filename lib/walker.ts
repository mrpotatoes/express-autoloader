/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
// TODO: Convert to use fp-ts

import fs from 'fs'

export const walk = (dir: string) => {
  // eslint-disable-next-line functional/prefer-readonly-type
  let results: string[] = []
  const list = fs.readdirSync(dir)
  const regex = new RegExp('routes?.(ts|js)')

  list.forEach((file: string) => {
    file = dir + '/' + file

    const isRoute = regex.test(file)
    const stat = fs.statSync(file)

    if (stat && stat.isDirectory() && !isRoute) {
      results = results.concat(walk(file))
    } else if (isRoute) {
      results.push(file)
    }
  })

  return results
}
