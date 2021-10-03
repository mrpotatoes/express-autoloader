// TODO: Move `src/_routes/` to `tests/__mocks__`
import { METHOD, VERSIONS } from '../../lib/types/constants'
import { Route } from '../../lib/types/routes'
import { middleware1, middleware2 } from './middlewares'

export const errorsout = (req, res) => ({
  // export const api0 = (req, res): Route => ({
  method: METHOD.GET,
  path: 'tester',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  dependencies: {
    deps: '',
  },

  handler: async (req, res) => {
    // console.log('dependencies', this.dependencies)
    throw new Error('andric has failed ... DUN DUN DUUUUUUN!!!!!!')
    // return { thing: 'legit' }
  },

  error: async (req, res) => {
    return { thing: 'this failed and I am so sorry' }
  },
})