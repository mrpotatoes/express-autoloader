import { METHOD, VERSIONS } from '../../../lib/lib/stuff'
import { middleware1, middleware2 } from '../middlewares'

export const thingy = (req, res) => ({
  method: METHOD.GET,
  path: 'api/wishlist/:list/',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(req.originalUrl);
  },
})