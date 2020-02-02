/**
 * Representation of a validator
 */
interface Validator {
  /**
   * Validate the given data against the provided schema object
   */
  validate<T>(data: T, schema: object): Promise<T>
}

export { Validator }
