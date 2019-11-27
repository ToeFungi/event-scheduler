import { SinonSandbox } from 'sinon'

const DDBMock = (sandbox: SinonSandbox) => ({
  putItem: sandbox.stub(),
  promise: sandbox.stub()
})

export { DDBMock }
