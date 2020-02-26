import * as Logger from 'bunyan'

import { Response } from './models/Response'
import { Validator } from './types/Validator'
import { ErrorMapper } from './lib/ErrorMapper'
import { ScheduledEvent } from './models/ScheduledEvent'
import { LoggerFactory } from './factories/LoggerFactory'
import { SchedulerService } from './services/SchedulerService'

import * as incomingRequestSchema from '../schemas/incoming-request-schema.json'

/**
 * Controller orchestrates the various services and repositories to schedule an event
 */
class Controller {
  private logger: Logger

  constructor(protected validator: Validator, protected schedulerService: SchedulerService,
              loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('controller')
  }

  /**
   * Handles the incoming schedule event request
   */
  public handler(event: ScheduledEvent): Promise<Response> {
    /**
     * Tap response and log success
     */
    const tapResponse = (): Response => {
      this.logger.debug('Successfully scheduled event')
      return {
        body: 'Message accepted for scheduling',
        statusCode: 201
      }
    }

    this.logger.debug('Attempting to schedule event', { event })
    return this.validator.validate<ScheduledEvent>(event, incomingRequestSchema)
      .then(this.schedulerService.createEvent.bind(this.schedulerService))
      .then(tapResponse)
      .catch(ErrorMapper.mapError)
  }
}

export { Controller }
