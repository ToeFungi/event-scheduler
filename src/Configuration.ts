require('dotenv')
  .config()

import { AppConfiguration } from './models/configuration/AppConfiguration'

const configuration = {
  aws: {
    region: process.env.AWS_REGION
  },
  logging: {
    name: process.env.LOGGER_NAME,
    level: process.env.LOGGER_LEVEL
  }
} as AppConfiguration

export { configuration }
