import { METHOD, VERSIONS } from '../../../../lib/lib/stuff'
import { middleware1, middleware2 } from '../../middlewares'

export const deeperSomething = (req, res) => ({
  method: METHOD.GET,
  path: 'api/home/deeper/something',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(req.originalUrl);
  },
})