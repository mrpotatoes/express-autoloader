/* eslint-disable functional/no-let */
/* eslint-disable functional/immutable-data */
// TODO: Convert to use fp-ts

import fs from 'fs'
import path from 'path'

export const walk = (dir: string) => {
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
