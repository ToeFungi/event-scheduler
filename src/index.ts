import { DynamoDB } from 'aws-sdk'

import { Controller } from './Controller'
import { SchedulerService } from './services/SchedulerService'
import { DynamoRepository } from './repositories/DynamoRepository'

// Repository
const dynamoDB = new DynamoDB({
  region: 'eu-west-1',
  apiVersion: '2012-08-10'
})
const ddbRepository = new DynamoRepository(dynamoDB)

// Service
const schedulerService = new SchedulerService(ddbRepository)

// Controller
const controller = new Controller(schedulerService)

// Handler
export const handler = controller.handler.bind(controller)
