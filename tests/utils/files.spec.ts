import fs, { Dirent } from 'fs'
import path from 'path'
import * as FILES from '../../lib/utils/files'

const scrub = (path: string): string => path.substring(path.indexOf('tests') - 1)

const direntifiyer = (files): Dirent[] => files.map(name => name)

describe('utils/files.ts', () => {
  // const mockedFs = fs as jest.Mocked<typeof fs>
  const filesArrayMock = [
    'tests/__mocks__/test.routes.ts',
    'tests/__mocks__/cart/index.routes.ts',
    'tests/__mocks__/home/assign.routes.ts',
    'tests/__mocks__/home/deeper/get.routes.ts',
    'tests/__mocks__/search/index.routes.ts',
    'tests/__mocks__/wishlist/index.routes.ts'
  ]

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('fileResolved()', () => {
    expect(FILES.fileResolved('/some/path/yes')).toEqual('/some/path/yes')
  })

  it('allFiles() - not recursive', () => {
    jest.spyOn(fs, 'readdirSync').mockImplementation(() => (
      direntifiyer([filesArrayMock[0]])
    ))

    jest.mock('fs', () => ({
      readdirSync: () => direntifiyer([filesArrayMock[0]])
    }))

    const mocksPath = path.join('__mocks__')
    const files = FILES.allFiles(mocksPath, false).map(scrub)

    expect(files).toEqual(['/tests/__mocks__/test.routes.ts'])
  })

  it.skip('allFiles() - recursive', () => {
    // jest.spyOn(fs, 'readdirSync').mockImplementation(() => (direntifiyer(filesArrayMock)))
    // jest.spyOn(fs, 'statSync').mockImplementation(() => ({
    //   isFile: () => true,
    // }))

    const mocksPath = path.join('__mocks__')
    const files = FILES.allFiles(mocksPath, true).map(scrub)

    expect(files).toEqual(filesArrayMock)
  })

  it.skip('fileRequire()', () => {
    const toRequire = FILES.fileRequire('/some/legit/path/test.routes.ts')
    const mock = {
      isFile: true,
      isSource: true,
      isLegit: true
    }
    expect(toRequire).toEqual(mock)
  })

  it.skip('isValidRequireable()', () => {
    expect(FILES.isValidRequireable('/some/legit/path/test.routes.ts')).toEqual(true)
  })
})
