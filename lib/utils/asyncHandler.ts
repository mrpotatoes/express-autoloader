/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express'
import * as log from './logger'

const defaultErrorHandler = (deps) => async (req: Request, res: Response): Promise<any> => ({
  hander: 'defaultErrorHandler()',
  generic: 'yes',
  ...deps,
})

// The safe handler that wraps everything
export const asyncHandler = <T extends object>(deps: T, right, left = defaultErrorHandler) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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