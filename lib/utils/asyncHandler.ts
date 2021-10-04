import * as log from './logger'
// export const wrapperError = (next, res, deets) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.status(500)
//   res.send(JSON.stringify(deets))
// 
//   return next
// }

const defaultErrorHandler = async (req, res): Promise<any> => ({
  hander: 'defaultErrorHandler()',
  generic: 'yes',
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
      left: (await left(req, res)),
    })
    res.end()
  }
}