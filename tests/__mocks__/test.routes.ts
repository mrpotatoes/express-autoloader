/* eslint-disable @typescript-eslint/no-unused-vars */
import { METHOD, VERSIONS } from '../../lib/types/constants'
import { middleware1, middleware2 } from './middlewares'
import { Route, JSONResponse } from '../../lib/types/routes'
// import { Dependencies } from '../../lib/types/misc'
import { Request, Response } from 'express'

interface Dependencies {
  req: Request
  res: Response
}
interface TestDependencies extends Dependencies {
  name: string,
}

export const testRandomError1 = (): Route<TestDependencies> => ({
  method: METHOD.GET,
  path: 'test1/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  dependencies: {
    name: "Johnny Cage",
  } as TestDependencies,

  run: (deps: TestDependencies) => async (req1: Request, res2: Response): Promise<JSONResponse> => {
    const { req, res, ...cleanedDeps } = deps
    console.log(cleanedDeps)

    if (parseInt(req.params.id) == 1) {
      throw new Error('/test/? failed')
    }

    return {
      thing: 'legit',
      ...cleanedDeps,
    }
  },

  error: (deps: TestDependencies) => async (req: Request, res: Response): Promise<JSONResponse> => {

    return ''
  },
})

// export const testRandomError2 = (): Route<TestDependencies> => ({
//   method: METHOD.POST,
//   path: 'test2/:id',
//   middlewares: [middleware1, middleware2],
//   prodExclude: false,
//   version: VERSIONS.V1,

//   dependencies: {
//     name: "Johnny Cage",
//   },

//   run: (deps: TestDependencies) => async (req: Request, res: Response): Promise<JSONResponse> => {
//     if (parseInt(req.params.id) == 1) {
//       throw new Error('/test/? failed')
//     }

//     return {
//       thing: 'legit',
//       ...deps
//     }
//   },

//   error: (deps: TestDependencies) => async (req: Request, res: Response): Promise<JSONResponse> => ({
//     thing: 'this failed and I am so sorry',
//     ...deps
//   }),
// })

// export const testRandomError3 = (): Route<TestDependencies> => ({
//   method: METHOD.GET,
//   path: 'test3/:id',
//   middlewares: [middleware1, middleware2],
//   prodExclude: false,
//   version: VERSIONS.V1,

//   dependencies: {
//     name: "Johnny Cage",
//   },

//   run: (deps: TestDependencies) => async (req: Request, res: Response): Promise<JSONResponse> => {
//     if (parseInt(req.params.id) == 1) {
//       throw new Error('/test/? failed')
//     }

//     return {
//       thing: 'legit',
//       ...deps
//     }
//   },

//   error: (deps: TestDependencies) => async (req: Request, res: Response): Promise<JSONResponse> => ({
//     thing: 'this failed and I am so sorry',
//     ...deps
//   }),
// })
