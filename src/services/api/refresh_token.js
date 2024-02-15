import { authStore } from 'src/stores/auth'
import { Api } from '.'
import { Config } from '../config'

export const refreshToken = async () => {
  let data
  const api = new Api()
  await api.get('/auth/user/refresh', ({ data, status }) => {
    console.log(status)
    if (status == 200 && data['accessToken']) {
      authStore().setAccessToken(data['accessToken'])
      data = data['accessToken']
    } else {
      Config.logout()
      data =  null
    }
  })

  return data
}

