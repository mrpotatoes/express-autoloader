import { METHOD, VERSIONS, middleware1, middleware2 } from '../../lib/stuff'

export const homeAndricGet2 = (req, res) => ({
  method: METHOD.GET,
  path: 'ignore/me',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
})