import { authStore } from 'src/stores/auth'
import { Api } from '.'
import { Config } from '../config'

export const refreshToken = async () => {
  const api = new Api()

  return await api.useToken(false).get('/auth/user/refresh', ({ data, status }) => {
    if (status == 200 && data['accessToken']) {
      console.log('refresh...')

      authStore().setAccessToken(data['accessToken'])

      return data['accessToken']
    } else {
      Config.logout()
      return null
    }
  })
}
