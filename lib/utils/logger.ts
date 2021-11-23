import chalk from 'chalk'

export const pass = (url: string, ret: any): void =>
  console.log(`[${chalk.black.bgGreen('PASS')}]: ${url} ${JSON.stringify(ret, null, '  ')}`)

export const fail = (url: string, error: any): void =>
  console.log(`[${chalk.black.bgRed('ERROR')}]: ${url} → ${error}`)