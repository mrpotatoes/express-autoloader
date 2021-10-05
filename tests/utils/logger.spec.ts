import * as LOGGER from '../../lib/utils/logger'

describe('utils/logger.ts', () => {
  it('fail()', () => {
    expect(LOGGER.fail('https://url', 'data')).toContain('https://url → data')
  })

  it('pass()', () => {
    expect(LOGGER.pass('https://url', 'data')).toContain('https://url')
  })
})
