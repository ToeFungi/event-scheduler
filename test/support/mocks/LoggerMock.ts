import * as Logger from 'bunyan'

class LoggerMock extends Logger {
  constructor(options = { name: 'mock-logger' }) {
    super(options)
  }

  info = () => true
  debug = () => true
  error = () => true
  trace = () => true
}

export { LoggerMock }
