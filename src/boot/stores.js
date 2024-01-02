import { boot } from 'quasar/wrappers'
import { authStore } from 'src/stores/auth'
import { resvStore } from 'src/stores/reservation'

// we globally register our component with Vue
export default boot(({ app }) => {
  app.config.globalProperties.$AuthStore = authStore()
  app.config.globalProperties.$ResvStore = resvStore()
})
