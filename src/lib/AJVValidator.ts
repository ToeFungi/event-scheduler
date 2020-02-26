import * as Logger from 'bunyan'

import { Ajv } from 'ajv'

import { Validator } from '../types/Validator'
import { LoggerFactory } from '../factories/LoggerFactory'
import { ValidationError } from '../errors/ValidationError'

/**
 * AJV Validator is an AJV implementation of the Validator interface and handles data validation against a given schema
 */
class AJVValidator implements Validator {
  private logger: Logger

  constructor(protected ajv: Ajv, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('ajv-validator')
  }

  /**
   * @inheritDoc
   */
  public validate<T>(data: T, schema: object): Promise<T> {
    /**
     * Validate the data against the given schema
     */
    const validateAgainstSchema = () => this.ajv.validate(schema, data)

    /**
     * If the validation fails, throw a validation error
     */
    const throwIfInvalid = (isValid: any): void | never => {
      if (!isValid) {
        const errorStack = this.ajv.errorsText()

        this.logger.error('Data failed validation against given schema', { errorStack })
        throw new ValidationError('Validation Error', errorStack)
      }
    }

    /**
     * Tap response and return the initial data passed
     */
    const tapResponse = (): T => {
      this.logger.debug('Data passed validation against given schema')
      return data
    }

    this.logger.debug('Attempting to validate data against schema', { data, schema })
    return Promise.resolve()
      .then(validateAgainstSchema)
      .then(throwIfInvalid)
      .then(tapResponse)
  }
}

export { AJVValidator }
