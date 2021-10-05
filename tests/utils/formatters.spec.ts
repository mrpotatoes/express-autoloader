import { Request, Response } from 'express'
import * as FORMATTERS from '../../lib/utils/formatters'
import { METHOD } from '../../lib/types/constants'

describe('utils/formatters.ts', () => {
  it('trim()', () => {
    expect(FORMATTERS.trim('///qwe///', '/')).toEqual('qwe')
  })

  it('pathCache()', () => {
    expect(FORMATTERS.pathCache({
      method: METHOD.GET,
      path: 'test',
      prodExclude: false,
      run: () => async (req: Request, res: Response) => {
        return {
          nothing: 'none'
        }
      },
    })).toEqual({
      curl: 'curl -X GET http://localhost:2121/test',
      path: 'GET.test',
    })
  })
})
