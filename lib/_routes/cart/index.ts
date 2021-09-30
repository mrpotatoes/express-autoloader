import { METHOD, VERSIONS, middleware1, middleware2 } from '../../lib/stuff'

export const homeAndricGet = (req, res) => ({
  method: METHOD.GET,
  path: 'api/something/hey/:id/:something?query',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
})
