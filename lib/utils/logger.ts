import chalk from 'chalk'

export const fail = (url, error) => `[${chalk.black.bgRed('ERROR')}]: ${url} → ${error}`

export const pass = (url, ret) => `[${chalk.black.bgGreen('PASS')}]: ${url} ${JSON.stringify(ret, null, '  ')}`