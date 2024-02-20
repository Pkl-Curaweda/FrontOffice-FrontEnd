import { authStore } from 'src/stores/auth'
import { Api } from '.'
import { Config } from '../config'

export const refreshToken = async () => {
    const api = new Api()
    return await api.get('/auth/user/refresh', ({ status, data }) => {
      if (status == 200) {
        authStore().setAccessToken(data.accessToken)
        return data.accessToken
      }else {
        Config.logout()
      window.location.reload()
        return null
      }
    })
}

