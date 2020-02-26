import { createSandbox } from 'sinon'

import { Controller } from '../../src/Controller'
import { LoggerMock } from '../support/mocks/LoggerMock'
import { AJVValidator } from '../../src/lib/AJVValidator'
import { ScheduledEvent } from '../../src/models/ScheduledEvent'
import { LoggerFactory } from '../../src/factories/LoggerFactory'
import { ValidationError } from '../../src/errors/ValidationError'
import { SchedulerService } from '../../src/services/SchedulerService'

import * as generalFailureResponse from '../samples/controller/controller-general-error.json'
import * as validationFailureResponse from '../samples/controller/controller-validation-error.json'

import * as requestSchema from '../../schemas/incoming-request-schema.json'

describe('Controller', () => {
  const sandbox = createSandbox()

  const event = {} as ScheduledEvent

  const logger = new LoggerMock()

  let validator: any
  let loggerFactory: any
  let schedulerService: any
  let controller: Controller

  beforeEach(() => {
    validator = sandbox.createStubInstance(AJVValidator)
    loggerFactory = sandbox.createStubInstance(LoggerFactory)
    schedulerService = sandbox.createStubInstance(SchedulerService)

    loggerFactory.getNamedLogger.returns(logger)

    controller = new Controller(validator, schedulerService, loggerFactory)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#handler', () => {
    it('resolves when correct payload is passed', () => {
      validator.validate
        .onFirstCall()
        .resolves(event)

      schedulerService.createEvent
        .onFirstCall()
        .resolves()

      return controller.handler(event)
        .should.be.fulfilled
        .then(() => {
          validator.validate.should.have.been.calledOnceWithExactly(event, requestSchema)
          schedulerService.createEvent.should.have.been.calledOnceWithExactly(event)
        })
    })

    it('rejects with a validation error when the payload is malformed', () => {
      validator.validate
        .onFirstCall()
        .rejects(new ValidationError('Validation Error'))

      return controller.handler(event)
        .should.become(validationFailureResponse)
        .then(() => {
          validator.validate.should.have.been.calledOnceWithExactly(event, requestSchema)
          schedulerService.createEvent.should.have.callCount(0)
        })
    })

    it('rejects when an error occurs in the service layer', () => {
      validator.validate
        .onFirstCall()
        .resolves(event)

      schedulerService.createEvent
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return controller.handler(event)
        .should.become(generalFailureResponse)
        .then(() => {
          validator.validate.should.have.been.calledOnceWithExactly(event, requestSchema)
          schedulerService.createEvent.should.have.been.calledOnceWithExactly(event)
        })
    })
  })
})
