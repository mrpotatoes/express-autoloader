import chalk from 'chalk'

export const wrapperError = (next, res, deets) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(500)
  res.send(JSON.stringify(deets))

  return next
}

const failLogger = (url, error) => `[${chalk.black.bgRed('ERROR')}]: ${url} → ${error}`
const passLogger = (url, ret) => `[${chalk.black.bgGreen('PASS')}]: ${url} ${JSON.stringify(ret, null, '  ')}`

// The safe handler that wraps everything
export const asyncThing = (fn) => async (req, res, next) => {
  try {
    const ret = await fn(req, res, next)
    console.log(passLogger(req.originalUrl, ret))

    res.send({
      hellYeah: 'asd',
      ...ret
    })
  } catch (error) {
    console.log(failLogger(req.originalUrl, error))
    res.send({
      thereWasAnError: 'yeah, bud. Sorry :\'(',
      error: error.toString(),
    })
    res.end()
  }
}