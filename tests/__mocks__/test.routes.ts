/* eslint-disable @typescript-eslint/no-unused-vars */
import { METHOD, VERSIONS } from '../../lib/types/constants'
import { middleware1, middleware2 } from './middlewares'
import { Route, JSONResponse } from '../../lib/types/routes'
import { Request, Response } from 'express'

type TestDependencies = {
  name: string,
}

type TestDependencies2 = {
  // 
}

export const testRandomError = (req, res): Route<TestDependencies> => ({
  method: METHOD.GET,
  path: 'test/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  dependencies: {
    name: "Johnny Cage",
  },

  handler: (deps: TestDependencies2) => async (req: Request, res: Response): Promise<JSONResponse> => {
    if (parseInt(req.params.id) == 1) {
      throw new Error('/test/? failed')
    }

    return {
      thing: 'legit',
      ...deps
    }
  },

  error: (deps: TestDependencies) => async (req: Request, res: Response): Promise<JSONResponse> => ({
    thing: 'this failed and I am so sorry',
    ...deps
  }),
})
