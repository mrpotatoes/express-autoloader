<!--

"express-autoload-router": "^1.0.5",
"expressjs.routes.autoload": "^0.2.0"

https://developpaper.com/typescript-es6-promise-recursively-traverses-files-in-folders/

-->
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
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  error: errorFunction, 
  handler: (req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
});

// In file /routes/api2
export const api2 = (req, res) => ({
  method: METHOD.GET,
  path: 'api/something/hey/:id/:something?query',
  middlewares: [middleware1, middleware2],
  prodExclude: true,
  version: VERSIONS.V1,
  error: errorFunction, 

  // A more complex handler, see above.
  handler: someHandler,
});

// Some other file
import express from 'express';
import autoloader from '@mrpotatoes/express-autoloader';

// Allow for multiple paths
const paths = [
  path.join(__dirname, '/path/to/routes'),
]

autoloader(express(), paths, true);
```

## Example
Clone this repo, install then run `example:setup`.
Go into `example` and muck around in there.