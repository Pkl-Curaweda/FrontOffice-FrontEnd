import axios from 'axios'
import { refreshToken } from './refresh_token'

const myAxios = axios.create()

myAxios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { response } = err

    if (response.status == 401) {
      if (!err.config.sent) {
        err.config.sent = true

        const new_token = await refreshToken()

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
