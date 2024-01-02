import { defineStore } from 'pinia'
import func from './func'

export const resvStore = defineStore({
  id: 'reservation',
  state: () => ({
    currentResvId: 0,
    currentRoomResvId: 0
  }),
  actions: {
    setCurrentResvId(id = 0) {
      this.currentResvId = id
    },
    setCurrentRoomResvId(id = 0) {
      this.currentRoomResvId = id
    },
    clearData() {
      const data = {
        currentResvId: 0,
        currentRoomResvId: 0
      }
      this.$state = data
    }
  }
})
