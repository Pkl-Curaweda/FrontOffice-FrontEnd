import { defineStore } from 'pinia'
import func from './func'

export const resvStore = defineStore({
  id: 'reservation',
  state: () => ({
    currentResvId: 0,
    currentRoomResvId: 0,
    dateBill: '0000-00-00',
    Artlb: '',
    fix: false,
    UniqueId: 0
  }),
  actions: {
    setCurrentResvId(id = 0) {
      this.currentResvId = id
    },
    setCurrentRoomResvId(id = 0) {
      this.currentRoomResvId = id
    },
    setdateBill(value) {
      this.dateBill = value
    },
    setArtlb(value) {
      this.rtlb = value
    },
    setUniqueId(value) {
      this.UniqueId = value
    },
    setfix(value) {
      this.fix = value
    },
    clearData() {
      const data = {
        currentResvId: 0,
        currentRoomResvId: 0,
        dateBill: '',
        Artlb: '',
        UniqueId: 0,
        fix: false
      }
      this.$state = data
    }
  }
})
