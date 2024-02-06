import { LocalStorage, SessionStorage } from 'quasar'

export const Config = {
  appName() {
    return 'Hotel Management System'
  },
  modules() {
    return ['frontoffice', 'housekeeping', 'inroomservice']
  },
  version() {
    return '1.0'
  },
  copyright() {
    return '© 2023'
  },
  apiUrl(module = '') {
    let url = ''
    const hostname = window.location.hostname

    if (module == 'inroomservice') {
      url = 'http://localhost:3000/' // production
      if (hostname === 'localhost') url = 'http://localhost:3000/' // development
    } else if (module == 'housekeeping') {
      url = 'http://localhost:3000/hk/' // production
      if (hostname === 'localhost') url = 'http://localhost:3000/hk/' // development
    } else if (module == 'root') {
      url = 'http://localhost:3000/'
      if (hostname === 'localhost') url = 'http://localhost:3000/'
    } else if (module == 'impps') {
      url = 'http://localhost:3000/impps/'
      if (hostname === 'localhost') url = 'http://localhost:3000/impps/'
    } else {
      // default: frontoffice
      url = 'http://localhost:3000/fo/' // production
      if (hostname === 'localhost') url = 'http://localhost:3000/fo/' // development
    }
    return url
  },
  logout() {
    console.log('clear storage...')
    LocalStorage.clear()
    SessionStorage.clear()
  }
}
