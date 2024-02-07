<template>
  <div class="row" style="flex-wrap: nowrap">
    <div class="column">
      <q-item
        v-for="status in roomStatus[0]"
        :key="status.status"
        clickable
        class="text-center"
        :style="`background-color: ${status.bg_color}; color: ${status.text_color}`"
        @click="selectStatus(status)"
      >
        <q-item-section>{{ status.status }}</q-item-section>
      </q-item>
    </div>

    <div class="column">
      <q-item
        v-for="status in roomStatus[1]"
        :key="status.status"
        clickable
        class="text-center"
        :style="`background-color: ${status.bg_color}; color: ${status.text_color}`"
        @click="selectStatus(status)"
      >
        <q-item-section>{{ status.status }}</q-item-section>
      </q-item>
    </div>

    <div class="column">
      <q-item
        v-for="status in roomStatus[2]"
        :key="status.status"
        clickable
        class="text-center"
        :style="`background-color: ${status.bg_color}; color: ${status.text_color}`"
        @click="selectStatus(status)"
      >
        <q-item-section>{{ status.status }}</q-item-section>
      </q-item>
    </div>

    <div class="column">
      <q-item
        v-for="status in roomStatus[3]"
        :key="status.status"
        clickable
        class="text-center"
        :style="`background-color: ${status.bg_color}; color: ${status.text_color}`"
        style="flex-grow: 1"
        @click="selectStatus(status)"
      >
        <q-item-section>{{ status.status }}</q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { roomStatus } from 'src/data/room-status.js'

export default defineComponent({
  name: 'RoomPlanDropdown',
  props: { room: Number },
  setup() {
    return {
      roomStatus,
      selectedStatus: {
        status: '',
        bg: '',
        text: ''
      }
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice')
    }
  },
  methods: {
    selectStatus(status) {
      this.selectedStatus = { ...status }
      this.$emit('status', { ...this.selectedStatus, room: this.room })
      console.log(this.selectedStatus)

      let url = `floorplan/detail/${this.room}/${this.selectedStatus.status}`

      console.log(this.selectedStatus.status)

      if (this.selectedStatus.status !== '') {
        this.api.post(url, null, ({ status }) => {
          if (status == 200) {
            window.location.reload()
          }
        })
      }
    }
  }
})
</script>
