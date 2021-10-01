import { METHOD, VERSIONS } from '../../../lib/types/constants'
import { middleware1, middleware2 } from '../middlewares'

export const cart = (req, res) => ({
  method: METHOD.GET,
  path: 'api/cart/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`cart/${req.params.id}`)
  },
})
