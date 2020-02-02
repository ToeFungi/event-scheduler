import { Response } from './types/Response'
import { Validator } from './types/Validator'
import { ErrorMapper } from './errors/ErrorMapper'
import { ScheduledEvent } from './types/ScheduledEvent'
import { SchedulerService } from './services/SchedulerService'

import * as incomingRequestSchema from '../schemas/incoming-request-schema.json'

/**
 * Controller orchestrates the various services and repositories to schedule an event
 */
class Controller {
  constructor(protected validator: Validator, protected schedulerService: SchedulerService) {
  }

  /**
   * Handles the incoming schedule event request
   */
  public handler(event: ScheduledEvent): Promise<Response> {
    /**
     * Tap response and log success
     */
    const tapResponse = (): Response => {
      console.log('Successfully scheduled event')
      return {
        body: 'Message accepted for scheduling',
        statusCode: 201
      }
    }

    console.log('Attempting to schedule event', { event })
    return this.validator.validate<ScheduledEvent>(event, incomingRequestSchema)
      .then(this.schedulerService.createEvent.bind(this.schedulerService))
      .then(tapResponse)
      .catch(ErrorMapper.mapError)
  }
}

export { Controller }
