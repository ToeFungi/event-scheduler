import { ValidationError } from '../../../src/errors/ValidationError'

describe('ValidationError', () => {
  let validationError: ValidationError

  beforeEach(() => {
    validationError = new ValidationError('Validation Error', 'something, broke')
  })

  describe('#getValidationMessages', () => {
    it('returns the trimmed messages as an array', () => {
      const response = [
        'something',
        'broke'
      ]

      return validationError.getValidationMessages()
        .should.deep.equal(response)
    })
  })

  describe('#getStatus', () => {
    it('returns the status code of the error', () => {
      return validationError.getStatus()
        .should.deep.equal(400)
    })
  })
})
