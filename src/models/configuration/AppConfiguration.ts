import { AWSConfiguration } from './AWSConfiguration'
import { LoggerConfiguration } from './LoggerConfiguration'

/**
 * Representation of the configuration required by the application
 */
interface AppConfiguration {
  aws: AWSConfiguration
  logging: LoggerConfiguration
}

export { AppConfiguration }
