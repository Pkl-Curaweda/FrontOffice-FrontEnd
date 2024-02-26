<template>
  <q-btn round dense flat icon="o_notifications" @click="getNotif">
    <q-badge color="negative" text-color="white" v-if="notifNumber > 0" floating>
      {{ notifNumber }}</q-badge
    >
    <q-tooltip>Notifications</q-tooltip>
    <q-menu fit anchor="bottom left" self="top left" style="width: 300px">
      <q-item class="bg-primary text-white">
        <q-item-section>Messages</q-item-section>
      </q-item>
      <q-item clickable v-for="(data, key, i) in notif" :key="i">
        <q-item-section>
          <div class="row items-center justify-between">
            <div>
              <div class="row items-center">
                <div class="q-ma-none">{{ data.content }}</div>
              </div>
              <p class="text-body2 q-ma-none">{{ data.time }}</p>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MessengerFloat',
  setup() {
    const show = ref()
    return {
      notifNumber: ref(),
      notif: [],
      show
    }
  },
  data() {
    return {
      api: new this.$Api('root')
    }
  },
  mounted() {
    this.getValue()
    this.fetchData()
  },
  methods: {
    getValue() {
      this.api.get('notif/value', ({ status, data }) => {
        if (status == 200) {
          this.notifNumber = data.value
        }
      })
    },
    getNotif() {
      let url = `notif/read`
      this.notifNumber > 0 ? (this.notifNumber = 0) : ''
      this.api.post(url, {}, () => {})
    },
    fetchData() {
      let url = `notif/`

      this.api.get(url, ({ status, data }) => {
        if (status == 200) {
          this.notif = data.map((nf) => ({
            content: nf.content,
            time: nf.time
          }))

        }
      })
    }
  }
})
</script>
