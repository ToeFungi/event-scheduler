import * as uuid from 'uuid'
import * as Logger from 'bunyan'

import { AWSError, DynamoDB } from 'aws-sdk'
import { PutItemInput, PutItemOutput } from 'aws-sdk/clients/dynamodb'

import { DynamoEvent } from '../models/DynamoEvent'
import { LoggerFactory } from '../factories/LoggerFactory'

/**
 * DynamoRepository interacts with the DynamoDB table for scheduling of events
 */
class DynamoRepository {
  private logger: Logger

  /**
   * DDB table used for scheduled events
   */
  private readonly table: string

  constructor(protected ddb: DynamoDB, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('dynamo-repository')
    this.table = 'scheduled-events'
  }

  /**
   * Inserts a new scheduled event into DDB
   */
  public scheduleEvent(event: DynamoEvent): Promise<void> {
    const params: PutItemInput = {
      TableName: this.table,
      Item: {
        id: {
          S: uuid.v4()
        },
        payload: {
          S: JSON.stringify(event)
        },
        scheduledTime: {
          S: event.scheduledTime
        }
      }
    }

    /**
     * Tap and log the response from DDB
     */
    const tapResponse = (response: PutItemOutput): void => {
      this.logger.debug('Item was put into DDB successfully', { response })
    }

    /**
     * Tap error response and throw the error
     */
    const tapError = (error: AWSError): never => {
      this.logger.error('Error occurred while attempting to put new event into DDB', { message: error.message })
      throw error
    }

    this.logger.debug('Attempting to put new event into DDB', { params })
    return this.ddb.putItem(params)
      .promise()
      .then(tapResponse)
      .catch(tapError)
  }
}

export { DynamoRepository }
