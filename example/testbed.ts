/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'

interface Dependencies {
  req: Request
  res: Response
}

interface TestDependencies extends Dependencies {
  name: string,
}

export const testRandomError1 = () => ({
  dependencies: {
    name: "Johnny Cage",
  },

  run: (deps: TestDependencies) => {
    const { req, res, ...cleanedDeps } = deps
    console.log(deps.name)

    return {
      ...cleanedDeps,
    }
  },
})





