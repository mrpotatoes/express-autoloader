import { METHOD, VERSIONS } from '../../../lib/types/constants'
import { Route, JSONResponse } from '../../../lib/types/routes'
import { Request, Response } from 'express'
import { middleware1, middleware2 } from '../middlewares'

// eslint-disable-next-line @typescript-eslint/ban-types
export const thingy = (): Route<object> => ({
  method: METHOD.GET,
  path: 'fun/fun/fun',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  // TODO: Fix the errors when this isn't setup correctly.
  // TODO: io-ts might be able to handle this use case.
  run: (deps: any) => async (req: Request, res: Response): Promise<JSONResponse> => {
    return {
      origUrl: req.originalUrl
    }
  },
})