import * as log from './logger'

const defaultErrorHandler = (deps) => async (req, res): Promise<any> => ({
  hander: 'defaultErrorHandler()',
  generic: 'yes',
  ...deps,
})

// The safe handler that wraps everything
export const asyncHandler = (deps, right, left = defaultErrorHandler) => async (req, res, next) => {
  try {
    const ret = await right(deps)(req, res, next)
    console.log(log.pass(req.originalUrl, ret))

    res.send({
      hellYeah: 'asd',
      ...ret
    })
  } catch (error) {
    console.log(log.fail(req.originalUrl, error))

    res.setHeader('Content-Type', 'application/json')
    res.status(500)
    res.send({
      error: error.toString(),
      left: (await left(deps)(req, res)),
    })
    res.end()
  }
}