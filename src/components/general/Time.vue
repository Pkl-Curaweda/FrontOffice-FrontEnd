<template>
  <q-btn unelevated dense outline class="q-px-sm" style="border-radius: 8px; color: #d9d9d9">
    <div class="row items-center q-gutter-sm">
      <q-icon
        name="access_time"
        class="cursor-pointer"
        color="primary"
        size="20px"
        style="transition: 0.5s"
      />
      <div class="text-body2 text-weight-medium q-pt-xs text-black">{{ time }}</div>
    </div>
    <q-popup-proxy transition-show="jump-down" transition-hide="jump-up">
      <q-time v-model="time">
        <div class="row items-center justify-end">
          <q-btn v-close-popup label="Close" color="primary" flat />
        </div>
      </q-time>
    </q-popup-proxy>
  </q-btn>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TimePicker',
  emits: ['getTime'],
  setup() {
    return {
      time: ref('00:00')
    }
  },
  methods: {
    setTime() {
      const hour = this.$Helper.getHour()
      const min = this.$Helper.getMin()
      this.time = `${hour}:${min}`
    }
  },
  mounted() {
    this.setTime()
  },
  watch: {
    time() {
      this.$emit('getTime', this.time)
    }
  }
}
</script>
