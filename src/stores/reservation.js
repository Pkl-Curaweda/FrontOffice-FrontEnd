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
    UniqueId: 0,
    ds: false,
    logc: false,
    waitingnote: '',
    selectedbank: '',
    selectedmethod: '',
    detail: false,
    addroom: false,
    borderColor: '#fe0001'
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
    setlogc(value) {
      this.logc = value
    },
    setds(value) {
      this.ds = value
    },
    setwaitingnote(value) {
      this.waitingnote = value
    },
    setBank(value) {
      this.selectedbank = value
    },
    setMethod(value) {
      this.selectedmethod = value
    },
    detailresv(value) {
      this.detail = value
    },
    setaddroom(value) {
      this.addroom = value
    },
    clearData() {
      const data = {
        currentResvId: 0,
        currentRoomResvId: 0,
        dateBill: '',
        Artlb: '',
        UniqueId: 0,
        fix: false,
        logc: false,
        ds: false,
        waitingnote: '',
        selectedbank: '',
        selectedmethod: '',
        detail: false,
        addroom: false
      }
      this.$state = data
    }
  }
})
