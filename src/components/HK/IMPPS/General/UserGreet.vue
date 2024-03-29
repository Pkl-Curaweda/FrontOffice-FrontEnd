<template>
  <div :class="classname + 'row items-center q-gutter-md'">
    <img :src="user.picture" style="width: 80px; border-radius: 100%" />
    <div style="white-space: nowrap">
      <div>{{ time }}</div>
      <div>{{ date }}</div>
      <div class="text-weight-bold text-h5">
        Hello, {{ user.name }} {{ aliases ? ' ( ' + aliases + ' ) ' : '' }}
      </div>
      <div class="text-weight-bold">{{ user.role.name }}</div>
      <div class="text-weight-bold" v-if="workload">Work Load : {{ workload || 0 }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'UserGreet',
  setup() {
    return {
      time: ref(''),
      date: ref(''),
      name: ref(),
      role: ref()
    }
  },
  data() {
    return {
      user: this.$AuthStore.getUser()
    }
  },
  props: {
    aliases: String,
    workload: String,
    classname: {
      type: String,
      default: ''
    }
  },
  created() {
    this.getTimeAndDate()
    console.log(this.user)
  },
  methods: {
    getTimeAndDate() {
      const fullTime = this.$Helper.getFullTime()
      const dateTime = new Date(fullTime)

      let hours = dateTime.getHours()
      const minutes = ('0' + dateTime.getMinutes()).slice(-2)
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12 // Jam '0' diubah menjadi '12' untuk format 12 jam.

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]

      const dayOfWeek = days[dateTime.getDay()]
      const dayOfMonth = dateTime.getDate()
      const month = months[dateTime.getMonth()]
      const year = dateTime.getFullYear()

      const formattedTime = hours + '.' + minutes + ' ' + ampm
      const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`

      this.time = formattedTime
      this.date = formattedDate
    }
  }
}
</script>
