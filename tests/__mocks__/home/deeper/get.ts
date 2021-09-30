import { METHOD, VERSIONS, middleware1, middleware2 } from '../../../../lib/lib/stuff'

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