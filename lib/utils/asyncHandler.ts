/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response, NextFunction } from 'express'
import { JSONResponse } from '../../lib/types/routes'
import * as log from './logger'

const defaultErrorHandler = async (deps: any): Promise<JSONResponse> => ({
  hander: 'defaultErrorHandler()',
  generic: 'yes',
})

// The safe handler that wraps everything
export const asyncHandler = <T extends object>(deps: T, right, left = defaultErrorHandler) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dependencies = { ...deps, req, res }

  try {
    const ret = await right(dependencies)
    console.log(log.pass(req.originalUrl, ret))

    res.send(ret)
  } catch (error) {
    console.log(log.fail(req.originalUrl, error))

    res.setHeader('Content-Type', 'application/json')
    res.status(500)
    res.send({
      error: error.toString(),
      left: (await left(dependencies)),
    })
    res.end()
  }
}
