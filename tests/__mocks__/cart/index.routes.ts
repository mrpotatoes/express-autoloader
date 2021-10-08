import { METHOD, VERSIONS } from '../../../lib/types/constants'
import { Route, JSONResponse } from '../../../lib/types/routes'
import { Request, Response } from 'express'
import { middleware1, middleware2 } from '../middlewares'

// eslint-disable-next-line @typescript-eslint/ban-types
export const cart = (): Route<object> => ({
  method: METHOD.GET,
  path: '///api/cart/:id///',
  // middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  run: (deps: any) => async (req: Request, res: Response): Promise<JSONResponse> => {
    return {
      origUrl: req.originalUrl
    }
  },
})
