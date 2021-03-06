/**
 * If you import a dependency which does not include its own type definitions,
 * TypeScript will try to find a definition for it by following the `typeRoots`
 * compiler option in tsconfig.json. For this project, we've configured it to
 * fall back to this folder if nothing is found in node_modules/@types.
 *
 * Often, you can install the DefinitelyTyped
 * (https://github.com/DefinitelyTyped/DefinitelyTyped) type definition for the
 * dependency in question. However, if no one has yet contributed definitions
 * for the package, you may want to declare your own. (If you're using the
 * `noImplicitAny` compiler options, you'll be required to declare it.)
 *
 * This is an example type definition which allows import from `module-name`,
 * e.g.:
 * ```ts
 * import something from 'module-name'
 * something()
 * ```
 */
import { Request, Response, NextFunction } from 'express'
import { METHOD, VERSIONS } from './constants'

export type JSONResponse =
  | string
  | number
  | boolean
  | { [x: string]: JSONResponse }
  | Array<JSONResponse>

export type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>

// eslint-disable-next-line @typescript-eslint/ban-types
export type Handler = <T extends object>(deps: T) => (req: Request, res: Response) => Promise<JSONResponse>

export type RouteSimpleTransform = {
  // HTTP Method
  method: METHOD,

  // The path
  path: string,
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type Route<T extends object> = {
  // HTTP Method
  method: METHOD,

  // The path
  path: string,

  // Exclude on prod or not (defaults to true)
  prodExclude?: boolean,

  // The version of your thingy. Is prepended to your path.
  version?: VERSIONS,

  // The worker. This is where you put your [business] logic
  run: (deps: T) => Promise<JSONResponse>,

  // This will be called in a catch, do your cleanup work here. Logging etc.
  error?: (deps: T) => Promise<JSONResponse>,

  middlewares?: Middleware[],

  // Anything that you may need. This is a generic.
  dependencies?: T
}

