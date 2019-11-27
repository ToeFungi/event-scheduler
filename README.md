# Event Scheduler
[![Build Status](https://travis-ci.org/ToeFungi/event-scheduler.svg?branch=master)](https://travis-ci.org/ToeFungi/event-scheduler)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=alert_status)](https://sonarcloud.io/dashboard?id=event-scheduler)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=bugs)](https://sonarcloud.io/dashboard?id=event-scheduler)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=code_smells)](https://sonarcloud.io/dashboard?id=event-scheduler)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=coverage)](https://sonarcloud.io/dashboard?id=event-scheduler)

This is the event scheduler module within the Event Scheduler Domain. It's purpose as a Lambda is to accept incoming
events via API Gateway, format these events and store them in DynamoDB. 

## Installation
To get started with this project, you need to clone this repository and install the node dependencies
```
$ git clone git@github.com:ToeFungi/event-scheduler.git
$ cd event-scheduler
$ npm install
```

## Tests
This project is completely covered by unit tests. To run these tests you can run the following commands
```
$ npm run lint
$ npm run test
$ npm run coverage
```

## Contribution
Any feedback and contributions are welcome. Just create a pull request. Please ensure to include any adjustments to the
existing tests and to cover the new code with unit tests.
