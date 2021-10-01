// TODO: Move `src/_routes/` to `tests/__mocks__`
import { METHOD, VERSIONS } from '../../lib/lib/stuff'
import { Route } from '../../lib/types/routes'
import { middleware1, middleware2 } from './middlewares'

export const api0 = (req, res): Route => ({
  method: METHOD.GET,
  path: 'api/something/:id/',
  // middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler: async (req, res) => {
    res.send(req.originalUrl)
  },
})

export const api = (req, res) => ({
  method: METHOD.GET,
  path: 'api/something/hey/:id/:something',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    console.log('hey')
    return res.send(`product detail ${req.params.id}`);
  },
})

export const api2 = (req, res) => ({
  method: METHOD.POST,
  path: 'api/something/hey/:id/:something?query',
  // middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
})

export default (req, res) => ({
  method: METHOD.CONNECT,
  path: 'api/something/hey/:id/:something?query',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
})
