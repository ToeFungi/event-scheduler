import { CallbackConfig } from './CallbackConfig'
import { ScheduledMessage } from './ScheduledMessage'

/**
 * Representation of the event that will be retrieved
 */
interface ScheduledEvent {
  message: ScheduledMessage
  callback: CallbackConfig
  scheduledTime: string
}

export { ScheduledEvent }
