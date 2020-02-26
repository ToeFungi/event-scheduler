import { LoggerFactory } from './factories/LoggerFactory'

require('dotenv')
  .config()

import * as Ajv from 'ajv'

import { DynamoDB } from 'aws-sdk'

import { Version } from './lib/Version'
import { Controller } from './Controller'
import { AJVValidator } from './lib/AJVValidator'
import { SchedulerService } from './services/SchedulerService'
import { DynamoRepository } from './repositories/DynamoRepository'
import { LoggerConfiguration } from './models/LoggerConfiguration'

// Logger Factory
const loggerConfig = {
  name: process.env.LOGGER_NAME,
  level: process.env.LOGGER_LEVEL
} as LoggerConfiguration
const loggerFactory = new LoggerFactory(loggerConfig)

// Validators
const ajv = new Ajv({
  allErrors: true
})
const validator = new AJVValidator(ajv, loggerFactory)

// Repository
const dynamoDB = new DynamoDB({
  region: process.env.AWS_REGION,
  apiVersion: '2012-08-10'
})
const ddbRepository = new DynamoRepository(dynamoDB, loggerFactory)

// Service
const schedulerService = new SchedulerService(ddbRepository, loggerFactory)

// Controller
const controller = new Controller(validator, schedulerService, loggerFactory)

// Handler
console.log('EventScheduler', Version.getGitHash())
export const handler = controller.handler.bind(controller)
