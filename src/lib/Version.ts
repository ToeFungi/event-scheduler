/**
 * Version contains getters to information pertaining to the current deployment
 */
class Version {
  /**
   * Returns the GIT Hash of the current deployment
   */
  public static getGitHash(): string {
    return '<GIT_HASH>'
  }
}

export { Version }
