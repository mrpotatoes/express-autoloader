import { METHOD, VERSIONS } from '../../../lib/types/constants'
import { Route, JSONResponse } from '../../../lib/types/routes'
import { middleware1, middleware2 } from '../middlewares'
import { Dependencies } from '../../../lib/types/misc'

// eslint-disable-next-line @typescript-eslint/ban-types
export const cart = (): Route<object> => ({
  method: METHOD.GET,
  path: '///api/cart/:id///',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  run: async (deps: Dependencies): Promise<JSONResponse> => {
    const { req } = deps

    if (parseInt(req.params.id) == 1) {
      throw new Error('/test/? failed')
    }

    return {
      origUrl: req.originalUrl
    }
  },

  error: async (deps: Dependencies): Promise<JSONResponse> => {
    const { req } = deps
    return {
      origUrl: req.originalUrl,
      thing: 'yes, this is a thing that shows up, thank you.'
    }
  },
})
