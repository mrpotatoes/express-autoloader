// TODO: Move `src/_routes/` to `tests/__mocks__`
import { METHOD, VERSIONS } from '../../lib/types/constants'
import { middleware1, middleware2 } from './middlewares'
// import { Route } from '../../lib/types/routes'

type Dependencies = {
  [key: string]: any
}

export const errorsout = (req, res) => ({
  // export const api0 = (req, res): Route => ({
  method: METHOD.GET,
  path: 'test/:id',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,

  // TODO: Make deps have a type.
  dependencies: {
    andric: "that's my name, don't wear it out!",
  } as Dependencies,

  handler: (deps) => async (req, res) => {
    if (req.params.id == 1) {
      throw new Error('andric has failed ... DUN DUN DUUUUUUN!!!!!!')
    }

    return {
      thing: 'legit',
      ...deps
    }
  },

  error: (deps) => async (req, res) => ({
    thing: 'this failed and I am so sorry',
    ...deps
  }),
})

// export const api0 = (req, res) => ({
//   // export const api0 = (req, res): Route => ({
//   method: METHOD.GET,
//   path: 'api/something/:id/',
//   middlewares: [middleware1, middleware2],
//   prodExclude: false,
//   version: VERSIONS.V1,

//   dependencies: {
//     andric: '',
//   },

//   handler: async (req, res) => {
//     throw new Error('andric failed')
//     res.send(req.originalUrl)
//   },
// })

// export const api = (req, res) => ({
//   method: METHOD.GET,
//   path: 'api/something/hey/:id/:something',
//   // middlewares: [middleware1, middleware2],
//   prodExclude: false,
//   version: VERSIONS.V1,
//   handler: async (req, res) => {
//     console.log('hey')
//     return res.send(`product detail ${req.params.id}`)
//   },
// })

// export const api2 = (req, res) => ({
//   method: METHOD.POST,
//   path: 'api/something/hey/:id/:something?query',
//   // // middlewares: [middleware1, middleware2],
//   prodExclude: false,
//   version: VERSIONS.V1,
//   handler: async (req, res) => {
//     return res.send(`product detail ${req.params.id}`)
//   },
// })

// export default (req, res) => ({
//   method: METHOD.CONNECT,
//   path: 'api/something/hey/:id/:something?query',
//   // middlewares: [middleware1, middleware2],
//   prodExclude: false,
//   version: VERSIONS.V1,
//   handler: async (req, res) => {
//     return res.send(`product detail ${req.params.id}`)
//   },
// })
