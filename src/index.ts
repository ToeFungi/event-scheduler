import { DynamoDB } from 'aws-sdk'

import { Version } from './lib/Version'
import { Controller } from './Controller'
import { SchedulerService } from './services/SchedulerService'
import { DynamoRepository } from './repositories/DynamoRepository'

// Repository
const dynamoDB = new DynamoDB({
  region: process.env.AWS_REGION,
  apiVersion: '2012-08-10'
})
const ddbRepository = new DynamoRepository(dynamoDB)

// Service
const schedulerService = new SchedulerService(ddbRepository)

// Controller
const controller = new Controller(schedulerService)

// Handler
console.log('EventScheduler', Version.getGitHash())
export const handler = controller.handler.bind(controller)
