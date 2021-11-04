import { METHOD, VERSIONS } from '../../../lib/types/constants'
import { Route, JSONResponse } from '../../../lib/types/routes'
import { middleware1, middleware2 } from '../middlewares'
import { Dependencies } from '../../../lib/types/misc'

// eslint-disable-next-line @typescript-eslint/ban-types
export const thingy = (): Route<object> => ({
  method: METHOD.GET,
  path: 'fun/fun/fun',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  run: async (deps: Dependencies): Promise<JSONResponse> => {
    return {
      origUrl: deps.req.originalUrl
    }
  },
})