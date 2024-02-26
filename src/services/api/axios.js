import axios from 'axios'
import { refreshToken } from './refresh_token'
import { authStore } from 'src/stores/auth'
import { realtimeNotif } from './realtime_notif'
import { Config } from '../config'

const myAxios = axios.create()

myAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response } = err

    if (response.status == 403) {
      const mainPath = authStore().getMainPath()
      window.location.replace(mainPath)
    }

    if (response.status == 401) {
      if (!err.config.sent) {
        err.config.sent = true
        const token = await refreshToken()
        if (token != null) {
          err.config.headers = {
            ...err.config.headers,
            Authorization: `Bearer ${token}`
          }
          return axios(err.config)
        }else{
          Config.logout()
          window.location.reload()
        }
    }
  }

    throw err
  }
)

export default myAxios
