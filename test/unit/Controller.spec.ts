import { createSandbox } from 'sinon'

import { Controller } from '../../src/Controller'
import { ScheduledEvent } from '../../src/types/ScheduledEvent'
import { SchedulerService } from '../../src/services/SchedulerService'

describe('Controller', () => {
  const sandbox = createSandbox()

  const event = {} as ScheduledEvent

  let schedulerService: any
  let controller: Controller

  beforeEach(() => {
    schedulerService = sandbox.createStubInstance(SchedulerService)

    controller = new Controller(schedulerService)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#handler', () => {
    it('resolves when correct payload is passed', () => {
      schedulerService.createEvent
        .onFirstCall()
        .resolves()

      return controller.handler(event)
        .should.be.fulfilled
        .then(() => {
          schedulerService.createEvent.should.have.been.calledOnceWithExactly(event)
        })
    })

    it('rejects when an error occurs in the service layer', () => {
      schedulerService.createEvent
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return controller.handler(event)
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
        .then(() => {
          schedulerService.createEvent.should.have.been.calledOnceWithExactly(event)
        })
    })
  })
})
