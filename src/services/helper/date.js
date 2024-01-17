export default {
  currentDate() {
    return new Date()
  },
  getFullTime() {
    const date = this.currentDate()
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    let hour = ('0' + date.getHours()).slice(-2)
    let min = ('0' + date.getMinutes()).slice(-2)
    let sec = ('0' + date.getSeconds()).slice(-2)

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  },
  getYear() {
    const date = this.currentDate()
    let year = date.getFullYear()

    return year
  },
  getMonth() {
    const date = this.currentDate()
    let month = ('0' + (date.getMonth() + 1)).slice(-2)

    return month
  },
  getDay() {
    const date = this.currentDate()
    let day = ('0' + date.getDate()).slice(-2)

    return day
  },
  getHour() {
    const date = this.currentDate()
    let hour = ('0' + date.getHours()).slice(-2)

    return hour
  },
  getMin() {
    const date = this.currentDate()
    let min = ('0' + date.getMinutes()).slice(-2)

    return min
  },
  getSec() {
    const date = this.currentDate()
    let sec = ('0' + date.getSeconds()).slice(-2)

    return sec
  }
}
