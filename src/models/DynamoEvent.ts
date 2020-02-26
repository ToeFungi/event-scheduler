import { ScheduledEvent } from './ScheduledEvent'

/**
 * Representation of the event to be stored in DynamoDB
 */
interface DynamoEvent {
  id: string
  payload: ScheduledEvent
  scheduledTime: string
}

export { DynamoEvent }
