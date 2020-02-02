import { ErrorMapper } from '../../../src/errors/ErrorMapper'
import { ValidationError } from '../../../src/errors/ValidationError'

import * as generalErrorResponse from '../../samples/errors/error-mapper-general-error.json'
import * as validationErrorResponse from '../../samples/errors/error-mapper-validation-error.json'

describe('ErrorMapper', () => {
  const tests = [
    {
      message: 'returns a ValidationError response type',
      error: new ValidationError(),
      response: validationErrorResponse
    },
    {
      message: 'returns a general Error response type',
      error: new Error(),
      response: generalErrorResponse
    }
  ]

  describe('#mapError', () => {
    tests.forEach((item) => {
      it(item.message, () => {
        return ErrorMapper.mapError(item.error)
          .should.deep.equal(item.response)
      })
    })
  })
})
