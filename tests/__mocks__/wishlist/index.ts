import { METHOD, VERSIONS, middleware1, middleware2 } from '../../../lib/lib/stuff'

export const thingy = (req, res) => ({
  method: METHOD.GET,
  path: 'api/hey/now/:id/:something?query',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
})