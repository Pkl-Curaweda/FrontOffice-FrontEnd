import { Config } from '../config/index'
import { authStore } from 'src/stores/auth'
import myAxios from './axios'
import { Helper } from '../helper'

export class Api {
  constructor(module = '') {
    this.module = module
    this.apiService = myAxios
    this.token = true
    this.multipart = false
  }

  useToken(val = true) {
    this.token = val
    return this
  }

  useMultipart(val = false) {
    this.multipart = val
    return this
  }

  async get(path, callback) {
    return await this.request('GET', path, null, callback)
  }

  async post(path, data, callback) {
    return await this.request('POST', path, data, callback)
  }

  async put(path, data, callback) {
    return await this.request('PUT', path, data, callback)
  }
  async delete(path) {
    return await this.request('DELETE', path);
  }

  async request(method = 'GET', path = '', data = null, callback) {
    const config = {
      method: method,
      url: path,
      baseURL: Config.apiUrl(this.module),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (this.multipart) config.headers['Content-Type'] = 'multipart/form-data'

    if (this.token) config.headers['Authorization'] = `Bearer ${authStore().getAccessToken()}`

    if (data) config['data'] = data

    try {
      const res = await myAxios.request(config)
      return callback({
        status: res.status,
        message: res.data?.message || '',
        data: res.data?.data || {}
      })
    } catch (err) {
      const { response } = err

      this.notif(err)
      return callback({
        status: response?.status || 599,
        message: response?.data?.message || 'Something wrong',
        data: response?.data?.data || {}
      })
    }
  }

  notif(err) {
    if (err.code == 'ERR_NETWORK') Helper.showNotif('Network Disconnected!', '', 'negative')

    const { response } = err
    if (!response) return
    const message = response.data.message

    if (response.status == 400) console.log('api_res_error: bad request')
    else if (response.status == 403) console.log('api_res_error: forbidden')
    else if (response.status == 404) Helper.showNotif(message || 'Data not found', '', 'warning')
    else if (response.status >= 500) console.log('api_res_error: server error')
  }
}
