import * as FILES from '../../lib/utils/files'

// TODO: Stub all of path/fs here.
describe('utils/files.ts', () => {
  it('fileResolved()', () => {
    expect(FILES.fileResolved('/some/path/yes')).toEqual('/some/path/yes')
  })

  it('fileRequire()', () => {
    // expect(FILES.fileRequire('/some/path/yes.ts')).toEqual('/some/path/yes')
  })
})
