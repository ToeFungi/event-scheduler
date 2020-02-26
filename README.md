# Event Scheduler
[![Build Status](https://travis-ci.org/ToeFungi/event-scheduler.svg?branch=master)](https://travis-ci.org/ToeFungi/event-scheduler)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=alert_status)](https://sonarcloud.io/dashboard?id=event-scheduler)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=bugs)](https://sonarcloud.io/dashboard?id=event-scheduler)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=code_smells)](https://sonarcloud.io/dashboard?id=event-scheduler)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=event-scheduler&metric=coverage)](https://sonarcloud.io/dashboard?id=event-scheduler)

This is the event scheduler module within the Event Scheduler Domain. It's purpose as a Lambda is to accept incoming
events via API Gateway, format these events and store them in DynamoDB. 

## Table of Content
- [Installation](#installation)
- [Usage](#usage)
    - [HTTP Scheduled Event](#http-scheduled-event)
    - [SQS Scheduled Event](#sqs-scheduled-event)
    - [Overview of Request Payload](#overview-of-request-payload)
    - [Important to Note](#important-to-note)
- [Tests](#tests)
- [Ongoing Development](#ongoing-development)
- [Contributions](#contribution)
- [License](#license)

## Installation
To get started with this project, you need to clone this repository and install the node dependencies
```
$ git clone git@github.com:ToeFungi/event-scheduler.git
$ cd event-scheduler
$ npm install
```

## Usage
Below illustrates how to schedule events.

#### HTTP Scheduled Event
Scheduling a message to be returned via an HTTP callback mechanism
```json
{
    "scheduledTime": "2019-12-05T17:26:32.846Z",
    "callback": {
        "type": "HTTP",
        "url": "https://some-url.com",
        "headers": {
            "authentication": "Bearer some-token"
        }
    },
    "message": {
      "foo": "bar"
    }
}
```
The above will attempt send a `POST` to the URL specified above containing the message body above at the time specified.
This will be accurate to about a minute. The response body will look as follows -
```json
{
  "foo": "bar"
}
```

#### SQS Scheduled Event
Scheduling a message to be returned via an SQS callback mechanism
```json
{
    "scheduledTime": "2019-12-05T17:26:32.846Z",
        "callback": {
        "type": "SQS",
        "url": "https://some-url.com",
        "headers": {
            "region": "us-east-1"
        }
    },
    "message": {
      "foo": "bar"
    }
}
```
The above will attempt publish the scheduled event to the URL specified above containing the message body above at the 
time specified. This will be accurate to about a minute. The response body will look as follows -
```json
{
  "foo": "bar"
}
```

### Overview of Request Payload
| Property         | Description                                                             | Required |
|------------------|-------------------------------------------------------------------------|----------|
| scheduledTime    | The time that the event should be triggered via the callback configured | &#9745;  |
| callback         | Callback configuration required when the event is triggered             | &#9745;  |
| callback.type    | Enumerated value [ 'HTTP' &#124; 'SQS' ]                                | &#9745;  |
| callback.url     | The URL for the callback to be triggered on                             | &#9745;  |
| callback.headers | Headers that should be supplied as key-value pairs                      | &#9744;  |
| message          | The payload that should be delivered                                    | &#9745;  |

### Important to Note
When using the callback type of `SQS`, the `region` _must_ be defined within the `callback.headers` for the message to
be properly returned.

When using the callback type of `HTTP`, the callback will always happen over a POST request.

## Tests
This project is completely covered by unit tests. To run these tests you can run the following commands
```
$ npm run lint
$ npm run test
$ npm run coverage
```

## Ongoing Development
You can track any work that is planned, in progress or finished on the public Trello board which can be found 
[here](https://trello.com/b/hQaUmCv3/esd-event-scheduler-domain)

## Contribution
Any feedback and contributions are welcome. Just create a pull request. Please ensure to include any adjustments to the
existing tests and to cover the new code with unit tests.

## License
MIT License

Copyright (c) 2019 Alex Pickering

