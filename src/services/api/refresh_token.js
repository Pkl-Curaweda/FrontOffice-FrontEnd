import { authStore } from 'src/stores/auth'
import { Api } from '.'
import { Config } from '../config'

export const refreshToken = async () => {
  try{
    const api = new Api()
    console.log('API GET')
    await api.get('/auth/user/refresh', ({ status, data }) => {
      console.log(status, data)
      if (status == 200 && data['accessToken']) {
        authStore().setAccessToken(data['accessToken'])
        return data['accessToken']
      }else {
        Config.logout()
        return null
      }
    })
  }catch(err){
    console.log(err)
  }
}

