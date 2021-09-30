import { METHOD, VERSIONS, middleware1, middleware2 } from '../../../lib/lib/stuff'

export const cart = (req, res) => ({
  method: METHOD.GET,
  path: 'api/cart/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`cart/${req.params.id}`);
  },
})
