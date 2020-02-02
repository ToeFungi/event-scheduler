import { Response } from '../types/Response'
import { ValidationError } from './ValidationError'

/**
 * Error Mapper maps the errors thrown to appropriate responses when required
 */
class ErrorMapper {
  /**
   * Map an error to an appropriate response when required
   */
  public static mapError(error: Error): Response {
    if (error instanceof ValidationError) {
      return {
        body: JSON.stringify({
          error: 'Validation failed on the request',
          reasons: error.getValidationMessages()
        }),
        statusCode: error.getStatus()
      }
    }

    return {
      body: 'Something went wrong on the server. Please try again later.',
      statusCode: 500
    }
  }
}

export { ErrorMapper }
