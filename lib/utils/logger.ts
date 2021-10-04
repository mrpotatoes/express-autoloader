import chalk from 'chalk'

export const fail = (url: string, error: any): string =>
  `[${chalk.black.bgRed('ERROR')}]: ${url} → ${error}`

export const pass = (url: string, ret: any): string =>
  `[${chalk.black.bgGreen('PASS')}]: ${url} ${JSON.stringify(ret, null, '  ')}`