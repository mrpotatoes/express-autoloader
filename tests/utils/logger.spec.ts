import * as LOGGER from '../../lib/utils/logger'

describe('utils/logger.ts', () => {
  it('fail()', () => {
    expect(LOGGER.fail('https://url', 'data'))
      .toContain('[\u001b[30m\u001b[41mERROR\u001b[49m\u001b[39m]: https://url → data')
  })

  it('pass()', () => {
    expect(LOGGER.pass('https://url', 'data'))
      .toContain('[\u001b[30m\u001b[42mPASS\u001b[49m\u001b[39m]: https://url "data"')
  })
})
