require('dotenv')
  .config()

import * as Ajv from 'ajv'

import { DynamoDB } from 'aws-sdk'

import { Version } from './lib/Version'
import { Controller } from './Controller'
import { AJVValidator } from './lib/AJVValidator'
import { SchedulerService } from './services/SchedulerService'
import { DynamoRepository } from './repositories/DynamoRepository'

// Validators
const ajv = new Ajv({
  allErrors: true
})
const validator = new AJVValidator(ajv)

// Repository
const dynamoDB = new DynamoDB({
  region: process.env.AWS_REGION,
  apiVersion: '2012-08-10'
})
const ddbRepository = new DynamoRepository(dynamoDB)

// Service
const schedulerService = new SchedulerService(ddbRepository)

// Controller
const controller = new Controller(validator, schedulerService)

// Handler
console.log('EventScheduler', Version.getGitHash())
export const handler = controller.handler.bind(controller)
