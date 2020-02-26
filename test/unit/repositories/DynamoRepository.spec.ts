import * as uuid from 'uuid'

import { createSandbox } from 'sinon'

import { DDBMock } from '../../support/mocks/DDBMock'
import { LoggerMock } from '../../support/mocks/LoggerMock'
import { LoggerFactory } from '../../../src/factories/LoggerFactory'
import { DynamoRepository } from '../../../src/repositories/DynamoRepository'

import * as dynamoQuery from '../../samples/repositories/dynamo-repository-dynamo-query.json'
import * as dynamoEvent from '../../samples/repositories/dynamo-repository-dynamo-event.json'

describe('DynamoRepository', () => {
  const sandbox = createSandbox()

  const logger = new LoggerMock()

  let ddbMock: any
  let loggerFactory: any
  let dynamoRepository: DynamoRepository

  beforeEach(() => {
    ddbMock = DDBMock(sandbox)

    sandbox.stub(uuid, 'v4')
      .returns('fcbdebcc-8f4f-4a95-b15d-502868626a6d')

    loggerFactory = sandbox.createStubInstance(LoggerFactory)

    loggerFactory.getNamedLogger.returns(logger)

    dynamoRepository = new DynamoRepository(ddbMock, loggerFactory)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#scheduleEvent', () => {
    it('resolves when the item is successfully inserted into DynamoDB', () => {
      ddbMock.putItem
        .onFirstCall()
        .returns(ddbMock)

      ddbMock.promise
        .onFirstCall()
        .resolves()

      return dynamoRepository.scheduleEvent(dynamoEvent as any)
        .should.be.fulfilled
        .then(() => {
          ddbMock.promise.should.have.callCount(1)
          ddbMock.putItem.should.have.been.calledOnceWithExactly(dynamoQuery)
        })
    })

    it('rejects when an error occurs attempting to insert item into DynamoDB', () => {
      ddbMock.putItem
        .onFirstCall()
        .returns(ddbMock)

      ddbMock.promise
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return dynamoRepository.scheduleEvent(dynamoEvent as any)
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
        .then(() => {
          ddbMock.promise.should.have.callCount(1)
          ddbMock.putItem.should.have.been.calledOnceWithExactly(dynamoQuery)
        })
    })
  })
})
