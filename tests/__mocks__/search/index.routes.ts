import { METHOD, VERSIONS } from '../../../lib/types/constants'
import { middleware1, middleware2 } from '../middlewares'

export const search = (req, res) => ({
  method: METHOD.GET,
  path: 'fun/fun/fun',
  // middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler: async (req, res) => {
    return res.send(req.originalUrl)
  },
})