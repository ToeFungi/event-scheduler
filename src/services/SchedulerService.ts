import 'moment-timezone'

import * as uuid from 'uuid'
import * as moment from 'moment'
import * as Logger from 'bunyan'

import { AWSError } from 'aws-sdk'

import { DynamoEvent } from '../models/DynamoEvent'
import { ScheduledEvent } from '../models/ScheduledEvent'
import { LoggerFactory } from '../factories/LoggerFactory'
import { DynamoRepository } from '../repositories/DynamoRepository'

/**
 * SchedulerService facilitates the creation of the event to be stored in DDB
 */
class SchedulerService {
  private logger: Logger

  constructor(protected ddbRepository: DynamoRepository, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('scheduler-service')
  }

  /**
   * Create the event that will be stored in DDB and call the repository
   */
  public createEvent(event: ScheduledEvent): Promise<void> {
    const payload: DynamoEvent = {
      id: uuid.v4(),
      payload: event,
      scheduledTime: moment(event.scheduledTime)
        .tz('UTC')
        .format('YYYY-MM-DDTHH:mm')
    }

    /**
     * Tap response and log success
     */
    const tapResponse = () => this.logger.debug('Successfully scheduled the event')

    /**
     * Tap and log error and rethrow the error
     */
    const tapError = (error: AWSError): never => {
      this.logger.error('Error occurred while attempting to schedule the event', { message: error.message })
      throw error
    }

    this.logger.debug('Attempting to schedule event', { payload })
    return this.ddbRepository.scheduleEvent(payload)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { SchedulerService }
