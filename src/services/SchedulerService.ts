import * as uuid from 'uuid'
import * as moment from 'moment'

import { AWSError } from 'aws-sdk'

import { DynamoEvent } from '../types/DynamoEvent'
import { ScheduledEvent } from '../types/ScheduledEvent'
import { DynamoRepository } from '../repositories/DynamoRepository'

/**
 * SchedulerService facilitates the creation of the event to be stored in DynamoDB
 */
class SchedulerService {
  constructor(protected ddbRepository: DynamoRepository) {
  }

  /**
   * Create the event that will be stored in DynamoDB and call the repository
   */
  public createEvent(event: ScheduledEvent): Promise<void> {
    const payload: DynamoEvent = {
      id: uuid.v4(),
      payload: event,
      scheduledTime: moment(event.scheduledTime)
        .format('YYYY-MM-DDTHH:mm')
    }

    /**
     * Tap response and log success
     */
    const tapResponse = () => console.debug('Successfully queries repository with payload')

    /**
     * Tap and log error and rethrow the error
     */
    const tapError = (error: AWSError): never => {
      console.error('Error occurred in SchedulerService', JSON.stringify({ message: error.message }))
      throw error
    }

    console.debug('Attempting to schedule event', JSON.stringify({ payload }))
    return this.ddbRepository.scheduleEvent(payload)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { SchedulerService }
