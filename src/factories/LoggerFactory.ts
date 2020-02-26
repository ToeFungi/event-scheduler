import * as Logger from 'bunyan'

import { LoggerConfiguration } from '../models/LoggerConfiguration'

/**
 * Logger Factory creates named instances of loggers
 */
class LoggerFactory {
  /**
   * Parent logger
   */
  protected logger: Logger

  constructor({ name, level }: LoggerConfiguration) {
    this.logger = Logger.createLogger({
      name,
      level: level as Logger.LogLevel
    })
  }

  /**
   * Create and return a named child logger
   */
  public getNamedLogger(loggerName: string): Logger {
    return this.logger.child({ loggerName })
  }
}

export { LoggerFactory }
