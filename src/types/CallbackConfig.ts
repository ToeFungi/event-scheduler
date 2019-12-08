/**
 * Representation of the callback configuration with the scheduled event
 */
interface CallbackConfig {
  url: string
  type: string
  headers?: {
    [name: string]: string
  }
}

export { CallbackConfig }
