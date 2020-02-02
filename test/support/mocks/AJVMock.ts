import { SinonSandbox } from 'sinon'

const AJVMock = (sandbox: SinonSandbox) => ({
  validate: sandbox.stub(),
  errorsText: sandbox.stub()
})

export { AJVMock }
