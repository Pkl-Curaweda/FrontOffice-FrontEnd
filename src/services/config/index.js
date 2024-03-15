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
    //DEPLOYMENT
    // if (module == 'inroomservice') {
    //   url = 'https://api-prmn.curaweda.com:3030/irs/' // production
    //   if (hostname === 'localhost') url = 'https://api-prmn.curaweda.com:3030/irs/' // development
    // } else if (module == 'housekeeping') {
    //   url = 'https://api-prmn.curaweda.com:3030/hk/' // production
    //   if (hostname === 'localhost') url = 'https://api-prmn.curaweda.com:3030/hk/' // development
    // } else if (module == 'root') {
    //   url = 'https://api-prmn.curaweda.com:3030/'
    //   if (hostname === 'localhost') url = 'https://api-prmn.curaweda.com:3030/'
    // } else if (module == 'superadmin') {
    //   url = 'https://api-prmn.curaweda.com:3030/sa'
    //   if (hostname === 'localhost') url = 'https://api-prmn.curaweda.com:3030/sa'
    // } else if (module == 'impps') {
    //   url = 'https://api-prmn.curaweda.com:3030/impps/'
    //   if (hostname === 'localhost') url = 'https://api-prmn.curaweda.com:3030/impps/'
    // } else if (module == 'superadmin') {
    //   url = 'https://api-prmn.curaweda.com:3030/sa/'
    //   if (hostname === 'localhost') url = 'https://api-prmn.curaweda.com:3030/sa/'
    // } else {
    //   // default: frontoffice
    //   url = 'https://api-prmn.curaweda.com:3030/fo/' // production
    //   if (hostname === 'localhost') url = 'https://api-prmn.curaweda.com:3030/fo/' // development
    // }

    //DEVELOPMENT
    if (module == 'inroomservice') {
      url = 'http://localhost:3000/irs/' // production
      if (hostname === 'localhost') url = 'http://localhost:3000/irs/' // development
    } else if (module == 'housekeeping') {
      url = 'http://localhost:3000/hk/' // production
      if (hostname === 'localhost') url = 'http://localhost:3000/hk/' // development
    } else if (module == 'root') {
      url = 'http://localhost:3000/'
      if (hostname === 'localhost') url = 'http://localhost:3000/'
    } else if (module == 'superadmin') {
      url = 'http://localhost:3000/sa'
      if (hostname === 'localhost') url = 'http://localhost:3000/sa'
    } else if (module == 'impps') {
      url = 'http://localhost:3000/impps/'
      if (hostname === 'localhost') url = 'http://localhost:3000/impps/'
    } else if (module == 'superadmin') {
      url = 'http://localhost:3000/sa/'
      if (hostname === 'localhost') url = 'http://localhost:3000/sa/'
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
