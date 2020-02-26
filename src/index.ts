import * as Ajv from 'ajv'

import { DynamoDB } from 'aws-sdk'

import { Version } from './lib/Version'
import { Controller } from './Controller'
import { configuration } from './Configuration'
import { AJVValidator } from './lib/AJVValidator'
import { LoggerFactory } from './factories/LoggerFactory'
import { SchedulerService } from './services/SchedulerService'
import { DynamoRepository } from './repositories/DynamoRepository'

// Logger Factory
const loggerFactory = new LoggerFactory(configuration.logging)

// Validators
const ajv = new Ajv({
  allErrors: true
})
const validator = new AJVValidator(ajv, loggerFactory)

// Repository
const dynamoDB = new DynamoDB({
  region: configuration.aws.region,
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
