import { Request, Response, NextFunction } from 'express'
import { JSONResponse } from '../../lib/types/routes'
import { Dependencies } from '../../lib/types/misc'

const defaultErrorHandler = async (_deps: any): Promise<JSONResponse> => ({
  hander: 'defaultErrorHandler()',
  generic: 'yes',
})

// The safe handler that wraps everything
export const asyncHandler = <T extends Dependencies>(deps: T, right: any, left = defaultErrorHandler) => async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const dependencies = { ...deps, req, res }

  try {
    const ret = await right(dependencies)
    dependencies.logger.pass(req.originalUrl, ret)

    res.send(ret)
  } catch (error) {
    console.log(dependencies.logger)
    dependencies.logger.fail(req.originalUrl, error)

    res.setHeader('Content-Type', 'application/json')
    res.status(500)
    res.send({
      error: error.toString(),
      left: (await left(dependencies)),
    })
    res.end()
  }
}
