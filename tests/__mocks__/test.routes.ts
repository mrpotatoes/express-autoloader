/* eslint-disable @typescript-eslint/no-unused-vars */
import { METHOD, VERSIONS } from '../../lib/types/constants'
import { middleware1, middleware2 } from './middlewares'
import { Route, JSONResponse } from '../../lib/types/routes'
import { TestDependencies, poolBuilder, PG_ENUM } from './middlewares'

export const testRandomError1 = (): Route<TestDependencies> => ({
  method: METHOD.GET,
  path: 'test1/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  dependencies: {
    name: "Johnny Cage",
    client: poolBuilder,
  } as TestDependencies,

  run: async (deps: TestDependencies): Promise<JSONResponse> => {
    const { req, res, } = deps

    if (parseInt(req.params.id) == 1) {
      throw new Error('/test/? failed')
    }

    const client = await deps.client()
    const records = await client.query("SELECT * FROM A_TABLE") // Create to test

    return [
      { rows: records.rows },
    ]
  },

  error: async (deps: TestDependencies): Promise<JSONResponse> => {
    const { req, res, ...cleanedDeps } = deps
    const client = await deps.client()
    await client.query(PG_ENUM.ROLLBACK);

    return {
      hey: 'yes, there was an error',
      origUrl: req.originalUrl
    }
  },
})

export const testRandomError2 = (): Route<TestDependencies> => ({
  method: METHOD.POST,
  path: 'test2/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  dependencies: {
    name: "Sarah Fuller",
  },

  run: async (deps: TestDependencies): Promise<JSONResponse> => {
    if (parseInt(deps.req.params.id) == 1) {
      throw new Error('/test/? failed')
    }

    return {
      thing: 'legit',
    }
  },
})

export const testRandomError3 = (): Route<TestDependencies> => ({
  method: METHOD.GET,
  path: 'test3/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  dependencies: {
    name: "Johnny Cage",
  },

  run: async (deps: TestDependencies): Promise<JSONResponse> => {
    if (parseInt(deps.req.params.id) == 1) {
      throw new Error('/test/? this is no goodie')
    }

    return {
      thing: 'legit',
    }
  },
})
