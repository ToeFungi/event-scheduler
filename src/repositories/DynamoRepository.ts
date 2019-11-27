import * as uuid from 'uuid'

import { AWSError, DynamoDB } from 'aws-sdk'
import { PutItemInput, PutItemOutput } from 'aws-sdk/clients/dynamodb'

import { DynamoEvent } from '../types/DynamoEvent'

/**
 * DynamoRepository interacts with the DynamoDB table for scheduling of events
 */
class DynamoRepository {
  /**
   * DynamoDB table used for scheduled events
   */
  private readonly table: string

  constructor(protected ddb: DynamoDB) {
    this.table = 'scheduled-events'
  }

  /**
   * Inserts a new scheduled event into DynamoDB
   */
  public scheduleEvent(event: DynamoEvent): Promise<void> {
    const params: PutItemInput = {
      TableName: 'scheduled-events',
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
     * Tap and log the response from DynamoDB
     */
    const tapResponse = (response: PutItemOutput): void => {
      console.debug('Item was put into DDB successfully', JSON.stringify({ response }))
    }

    /**
     * Tap error response and throw the error
     */
    const tapError = (error: AWSError): never => {
      console.error('Error occurred in DynamoRepository', JSON.stringify({ message: error.message }))
      throw error
    }

    console.debug('Attempting to put new event into DynamoDB', JSON.stringify({ params }))
    return this.ddb.putItem(params)
      .promise()
      .then(tapResponse)
      .catch(tapError)
  }
}

export { DynamoRepository }
