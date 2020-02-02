import { Ajv } from 'ajv'

import { Validator } from '../types/Validator'

/**
 * AJV Validator is an AJV implementation of the Validator interface and handles data validation against a given schema
 */
class AJVValidator implements Validator {
  constructor(protected ajv: Ajv) {
  }

  /**
   * @inheritDoc
   */
  validate<T>(data: T, schema: object): Promise<T> {
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

        throw new Error(`Validation Error. ${errorStack}`)
      }
    }

    /**
     * Tap response and return the initial data passed
     */
    const tapResponse = (): T => {
      console.log('Data passed validation against given schema')
      return data
    }

    console.debug('Attempting to validate data against schema', { data, schema })
    return Promise.resolve()
      .then(validateAgainstSchema)
      .then(throwIfInvalid)
      .then(tapResponse)
  }
}

export { AJVValidator }
