import { AWSError } from 'aws-sdk'

import { ScheduledEvent } from './types/ScheduledEvent'
import { SchedulerService } from './services/SchedulerService'

/**
 * Controller orchestrates the various services and repositories to schedule an event
 */
class Controller {
  constructor(protected schedulerService: SchedulerService) {
  }

  /**
   * Handles the incoming schedule event request
   */
  public handler(event: ScheduledEvent): Promise<void> {
    /**
     * Tap response and log success
     */
    const tapResponse = () => console.log('Successfully scheduled event')

    /**
     * Tap and log error and rethrow the error
     */
    const tapError = (error: AWSError): never => {
      console.error('Error creating scheduled event', JSON.stringify({ message: error.message }))
      throw error
    }

    console.log('Attempting to schedule event', { event })
    console.log('REGION', { region: process.env.AWS_REGION })
    return this.schedulerService.createEvent(event)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { Controller }
