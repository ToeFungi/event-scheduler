import { handler } from '../../src'

import * as sampleRequest from '../samples/incoming-valid-request.json'

handler(sampleRequest as any)
  .then(console.log)
  .catch(console.error)