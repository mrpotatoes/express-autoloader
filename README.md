<!--

"express-autoload-router": "^1.0.5",
"expressjs.routes.autoload": "^0.2.0"

https://developpaper.com/typescript-es6-promise-recursively-traverses-files-in-folders/

-->

```ts
enum METHOD {
  CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE
};

enum VERSIONS = {
  V1 = 'v1',
};

const middleware1 = (req, res, next) => {
  console.log('Middleware 1');
  next();
};

const middleware2 = (req, res, next) => {
  console.log('Middleware 2');
  next();
};

export const api = {
  method: METHOD.GET,
  path: 'api/something/hey/:id/:something?query',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
};

export const api2 = {
  method: METHOD.GET,
  path: 'api/something/hey/:id/:something?query',
  middlewares: [middleware1, middleware2],
  prodExclude: false,
  version: VERSIONS.V1,
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
};
```
