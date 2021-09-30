export enum METHOD {
  CONNECT, DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT, TRACE
};

export enum VERSIONS {
  V1 = 'v1',
};

export const middleware1 = (req, res, next) => {
  console.log('Middleware 1');
  next();
};

export const middleware2 = (req, res, next) => {
  console.log('Middleware 2');
  next();
};