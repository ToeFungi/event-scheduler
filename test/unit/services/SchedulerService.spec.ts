import * as uuid from 'uuid'

import { reset, set } from 'mockdate'
import { createSandbox } from 'sinon'

import { DynamoEvent } from '../../../src/types/DynamoEvent'
import { ScheduledEvent } from '../../../src/types/ScheduledEvent'
import { SchedulerService } from '../../../src/services/SchedulerService'
import { DynamoRepository } from '../../../src/repositories/DynamoRepository'

describe('SchedulerService', () => {
  const sandbox = createSandbox()

  const scheduledEvent = {} as ScheduledEvent
  const dynamoEvent = {
    scheduledTime: '2019-11-27T15:47',
    id: 'fcbdebcc-8f4f-4a95-b15d-502868626a6d',
    payload: scheduledEvent
  } as DynamoEvent

  let uuidStub: any
  let dynamoRepository: any
  let schedulerService: SchedulerService

  beforeEach(() => {
    set('2019-11-27T13:47:32.846Z')
    uuidStub = sandbox.stub(uuid, 'v4')
      .returns('fcbdebcc-8f4f-4a95-b15d-502868626a6d')

    dynamoRepository = sandbox.createStubInstance(DynamoRepository)

    schedulerService = new SchedulerService(dynamoRepository)
  })

  afterEach(() => {
    reset()
    sandbox.restore()
  })

  describe('#createEvent', () => {
    it('resolves when the correct payload is passed and the repository resolves successfully', () => {
      dynamoRepository.scheduleEvent
        .onFirstCall()
        .resolves()

      return schedulerService.createEvent(scheduledEvent)
        .should.be.fulfilled
        .then(() => {
          dynamoRepository.scheduleEvent.should.have.been.calledOnceWithExactly(dynamoEvent)
        })
    })

    it('rejects when an error occurs in the repository layer', () => {
      dynamoRepository.scheduleEvent
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return schedulerService.createEvent(scheduledEvent)
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
        .then(() => {
          dynamoRepository.scheduleEvent.should.have.been.calledOnceWithExactly(dynamoEvent)
        })
    })
  })
})
