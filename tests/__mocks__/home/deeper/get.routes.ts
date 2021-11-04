import { METHOD, VERSIONS } from '../../../../lib/types/constants'
import { Route, JSONResponse } from '../../../../lib/types/routes'
import { Dependencies } from '../../../../lib/types/misc'

// eslint-disable-next-line @typescript-eslint/ban-types
export const deepestDirectory = (): Route<object> => ({
  method: METHOD.GET,
  path: 'api/home/deeper/something',
  prodExclude: false,
  version: VERSIONS.V1,

  run: async (deps: Dependencies): Promise<JSONResponse> => {
    return {
      origUrl: deps.req.originalUrl
    }
  },
})