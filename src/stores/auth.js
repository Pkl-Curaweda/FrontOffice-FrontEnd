import { defineStore } from 'pinia'
import func from './func'

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: '',
    mainPath: '',
    user: {
      id: 0,
      username: '',
      email: '',
      name: '',
      picture: '',
      role: {
        id: 0,
        name: ''
      }
    }
  }),
  actions: {
    getMainPath() {
      this.path = func.getData(this.$id, 'mainPath', this.$state, 'local')
      return this.path
    },
    getAccessToken() {
      this.accessToken = func.getData(this.$id, 'accessToken', this.$state, 'local')
      return this.accessToken
    },
    getUser() {
      this.user = func.getData(this.$id, 'user', this.$state, 'local')
      return this.user
    },
    setAccessToken(accessToken = '') {
      func.saveData(this.$id, 'accessToken', this.$state, accessToken, 'local')
      this.accessToken = accessToken
    },
    setMainPath(path = ''){
      func.saveData(this.$id, 'mainPath', this.$state, path, 'local')
      this.path = path
    },
    setUser(data) {
      func.saveData(this.$id, 'user', this.$state, data, 'local')
      this.user = data
    },
    getData(index) {
      return func.getData(this.$id, index, this.$state, 'local')
    },
    setData(index, data) {
      func.saveData(this.$id, index, this.$state, data, 'local')
    },
    clearData() {
      const data = {
        accessToken: '',
        user: {
          id: 0,
          username: '',
          email: '',
          name: '',
          picture: '',
          role: {
            id: 0,
            name: ''
          }
        }
      }
      this.$state = data
      localStorage.setItem(this.$id, JSON.stringify(data))
    }
  }
})
