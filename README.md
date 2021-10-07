<!--

"express-autoload-router": "^1.0.5",
"expressjs.routes.autoload": "^0.2.0"

https://developpaper.com/typescript-es6-promise-recursively-traverses-files-in-folders/

https://github.com/tranvansang/middleware-async

-- ALIASES
https://www.npmjs.com/package/module-alias

-- APPLY FP-TS TO EXPRESS
https://hvalls.dev/posts/intro-functional-fpts

-- ROLLUP & TYPESCRIPT
https://github.com/alex1504/generator-rollup-tslib-starter
https://github.com/alexjoverm/typescript-library-starter
https://github.com/rollup/rollup-starter-lib
https://github.com/ezolenko/rollup-plugin-typescript2

-- TESTING
https://www.npmjs.com/package/@jest-mock/express

-->

![](./example/screenie.png)

## Why
1. I don't feel that adding express routes manually is a good use of my time.
1. I want to spend time figuring out & debugging why a path isn't being added.
1. Having a common `interface` makes it easy to create
1. The name of the path function isn't important, it's the path
1. The `Route` should be self sufficient and should declare everything it needs itself.
1. I like clean code and this will make things far cleaner.
1. I don't like `try`/`catch` code in my handlers.
    * That should be handled by some wrapping function and I declare my happy path and unhappy path functions
1. Dependencies shouldn't be hard to handle so I'm trying to make that easier.

## Use
```ts
/**
 * This will still not work, currently, because if there is an error
 * then there needs to be a way to handle those errors and cleanup. 
 * That will be in version 2 of this thing when I convert this to fp-ts.
 */
const someHandler = async (req, res) => {
  const client = new DB()
  const data = req.body
  await client.connect()

  const all = await client.query(statement)
  const data = all.rows

  for (const one of all) {
    await client.query(insertStatement(one))
  }

  await client.end()

  res.send({ all })
}

// In file /routes/api
export const api = (req, res) => ({
  method: METHOD.GET,
  path: 'api/something/hey/:id/:something?query',
  // middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  error: errorFunction, 
  handler: (req, res) {
    return res.send(`product detail ${req.params.id}`)
  },
})

// In file /routes/api2
export const api2 = (req, res) => ({
  method: METHOD.GET,
  path: 'api/something/hey/:id/:something?query',
  // middlewares: [middleware1, middleware2],
  prodExclude: true,
  version: VERSIONS.V1,
  error: errorFunction, 

  // A more complex handler, see above.
  handler: someHandler,
})

// Some other file
import express from 'express'
import autoloader from '@mrpotatoes/express-autoloader'

// Allow for multiple paths
const paths = [
  path.join(__dirname, '/path/to/routes'),
]

autoloader(express(), paths, true)
```

## Example
Clone this repo, install then run `example:setup`.
Go into `example` and muck around in there.

## Currently broken things
- I cannot use TS Paths in the config. What's up with that?
- Add in the vscode debugging stuff to make life easier.