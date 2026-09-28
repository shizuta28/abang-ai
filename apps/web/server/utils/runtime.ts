export function configString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

export function googleCredentials(oauth: unknown): { clientId: string, clientSecret: string } {
  if (typeof oauth !== 'object' || oauth === null || !('google' in oauth)) {
    return { clientId: '', clientSecret: '' }
  }
  const google = oauth.google
  if (typeof google !== 'object' || google === null) {
    return { clientId: '', clientSecret: '' }
  }
  return {
    clientId: 'clientId' in google ? configString(google.clientId) : '',
    clientSecret: 'clientSecret' in google ? configString(google.clientSecret) : ''
  }
}
