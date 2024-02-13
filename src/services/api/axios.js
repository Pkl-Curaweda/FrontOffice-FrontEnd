import axios from 'axios'
import { refreshToken } from './refresh_token'
import { authStore } from 'src/stores/auth'
import { realtimeNotif } from './realtime_notif'

const myAxios = axios.create()

myAxios.interceptors.response.use(
  (res) => {
    realtimeNotif()
    console.log('klhdashjkldfashjkdashjkdasjh')
    return res
  },
  async (err) => {
    const { response } = err
    if (response.status == 403) {
      const mainPath = authStore().getMainPath()
      window.location.replace(mainPath)
    }

    if (response.status == 401) {
      if (!err.config.sent) {
        err.config.sent = true

        console.log('HDASJBJSBBAJDBHABDJA')
        const new_token = await refreshToken()
        console.log(new_token)
        if (new_token != null) {
          err.config.headers = {
            ...err.config.headers,
            Authorization: `Bearer ${new_token}`
          }
        }

        return axios(err.config)
      }
    }

    throw err
  }
)

export default myAxios
