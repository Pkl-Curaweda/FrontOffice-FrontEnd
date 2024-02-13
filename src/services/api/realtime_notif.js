import { Api } from '.'
import { Config } from '../config'

export const realtimeNotif = async () => {
  const api = new Api()
  return await api.get('/notif/value', ({ data, status }) => {
    if (status == 200) {
      console.log('refresh...')
      console.log(data)
    } else {
      console.log(data)
      return null
    }
  })
}
