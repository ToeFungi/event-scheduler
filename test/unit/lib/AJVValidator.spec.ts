import { createSandbox } from 'sinon'

import { AJVMock } from '../../support/mocks/AJVMock'
import { LoggerMock } from '../../support/mocks/LoggerMock'
import { AJVValidator } from '../../../src/lib/AJVValidator'
import { LoggerFactory } from '../../../src/factories/LoggerFactory'
import { ValidationError } from '../../../src/errors/ValidationError'

describe('AJVValidator', () => {
  const sandbox = createSandbox()

  const schema = {}
  const message: object = {
    foo: 'bar'
  }

  const logger = new LoggerMock()

  let ajv: any
  let loggerFactory: any
  let ajvValidator: AJVValidator

  beforeEach(() => {
    ajv = AJVMock(sandbox)

    loggerFactory = sandbox.createStubInstance(LoggerFactory)

    loggerFactory.getNamedLogger.returns(logger)

    ajvValidator = new AJVValidator(ajv, loggerFactory)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#validate', () => {
    it('resolves with the original data when it matches the given schema', () => {
      ajv.validate
        .onFirstCall()
        .returns(true)

      return ajvValidator.validate(message, schema)
        .should.become(message)
        .then(() => {
          ajv.validate.should.have.been.calledOnceWithExactly(schema, message)
          ajv.errorsText.should.have.callCount(0)
        })
    })

    it('rejects with a validation error when the data mismatches the given schema', () => {
      ajv.validate
        .onFirstCall()
        .returns(false)

      return ajvValidator.validate(message, schema)
        .should.be.rejectedWith(ValidationError, 'Validation Error')
        .then(() => {
          ajv.validate.should.have.been.calledOnceWithExactly(schema, message)
          ajv.errorsText.should.have.callCount(1)
        })
    })
  })
})
