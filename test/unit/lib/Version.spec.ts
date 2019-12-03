import { Version } from '../../../src/lib/Version'

describe('Version', () => {
  describe('#getGitHash', () => {
    it('returns the git hash value', () => {
      return Version.getGitHash()
        .should.deep.equal('<GIT_HASH>')
    })
  })
})
