import express from 'express'
import * as ROUTES from '../../lib/utils/routes'
import { asyncHandler } from '../../lib/utils/asyncHandler'
import { Module } from '../../lib/types/misc'
// import { testRandomError } from '../__mocks__/test.routes'

// TODO: Tests
describe('index.ts', () => {
  jest.mock('../../lib/utils/asyncHandler', () => ({
    asyncHandler: jest.fn(),
  }))

  jest.mock('express', () => () => ({
    listen: jest.fn(),
    get: jest.fn()
  }))

  beforeEach(() => {
    // app.setMountPath('/admin');
  });

  it('route()', () => {
    const module: Module = {
      test: () => 'test'
    }
    expect(ROUTES.route(module, 'test')).toEqual('test')
  })

  it('registerRoute()', () => {
    // const app = express()
    // // asyncHandler = (deps, right, left) => async (req, res, next): Promise<void>
    // const mockimpl = ({}, jest.fn(), jest.fn()) => true
    // asyncHandler.mockImplementation(mockimpl)

    // ROUTES.registerRoute(app, testRandomError())
    // // asyncHandler

    // // expect(app.get).toBeCalledWith('test:id', () => { })
  })

  it('routeFn()', () => {
    expect(1).toEqual(1)
  })
})
