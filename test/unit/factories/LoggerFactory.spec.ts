import * as Logger from 'bunyan'

import { LoggerFactory } from '../../../src/factories/LoggerFactory'
import { LoggerConfiguration } from '../../../src/models/LoggerConfiguration'

describe('LoggerFactory', () => {
  const config = {
    level: 'debug',
    name: 'some-logger'
  } as LoggerConfiguration

  let loggerFactory: LoggerFactory

  beforeEach(() => {
    loggerFactory = new LoggerFactory(config)
  })

  describe('#getNamedLogger', () => {
    it('returns an instance of a logger', () => {
      return loggerFactory.getNamedLogger('baby-logger')
        .should.be.instanceof(Logger)
    })
  })
})
