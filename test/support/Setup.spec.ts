import * as sinonChai from 'sinon-chai'
import * as chaiAsPromised from 'chai-as-promised'

import { should, use } from 'chai'

import { ConsoleMock } from './mocks/ConsoleMock'

console = new ConsoleMock()

use(sinonChai)
use(chaiAsPromised)

should()
