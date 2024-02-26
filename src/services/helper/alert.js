/* eslint-disable */
import { Dialog, Notify, Loading, LoadingBar, openURL, BottomSheet } from 'quasar'

export default {
  loading(show = true) {
    LoadingBar.setDefaults({
      color: 'red',
      size: '3px',
      position: 'top'
    })
    if (show === false) {
      setTimeout(() => {
        LoadingBar.stop()
      }, 300)
    } else LoadingBar.start()
  },
  showToast(msg = '', color = 'dark', timeout = 5000, position = 'bottom', caption = '') {
    Notify.create({
      progress: true,
      message: msg,
      position: position,
      icon: 'info',
      color: color,
      timeout: timeout,
      caption: caption,
      actions: [
        {
          label: 'x',
          color: 'yellow',
          handler: () => {
          }
        }
      ]
    })
  },
  showSuccess(title = '', msg = '') {
    Notify.create({
      type: 'positive',
      message: title,
      caption: msg,
      position: 'top-right',
      timeout: 5000,
      actions: [
        {
          label: 'x',
          color: 'white',
          handler: () => {
          }
        }
      ]
    })
  },
  showNotif(title = '', msg = '', type = 'negative') {
    Notify.create({
      type: type,
      message: title,
      caption: msg,
      position: 'bottom',
      timeout: 5000
    })
  }
}
