import { googleCredentials } from '../../utils/runtime'

export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  const google = googleCredentials(config.oauth)
  return {
    google: Boolean(google.clientId && google.clientSecret)
  }
})
