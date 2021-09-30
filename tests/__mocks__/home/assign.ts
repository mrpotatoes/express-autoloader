import { METHOD, VERSIONS, middleware1, middleware2 } from '../../../lib/lib/stuff'

export const ignoreMe = (req, res) => ({
  method: METHOD.GET,
  path: 'ignore/me',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(req.originalUrl);
  },
})