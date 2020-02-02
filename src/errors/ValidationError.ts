/**
 * Validation Error occurs when given data fails a validation test
 */
class ValidationError extends Error {
  constructor(message = 'Validation Failed', protected validationMessages: string = '',
              protected status: number = 400) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }

  /**
   * Get the validation error messages
   */
  public getValidationMessages(): string[] {
    return this.validationMessages.split(',')
      .map((reason: string): string => reason.trim())
  }

  /**
   * Get the HTTP status that should be returned
   */
  public getStatus(): number {
    return this.status
  }
}

export { ValidationError }