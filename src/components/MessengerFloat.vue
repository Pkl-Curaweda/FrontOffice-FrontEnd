<template>
  <q-btn round dense flat icon="o_notifications">
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
    return {
      content: ref(),
      time: ref(),
      notif: []
    }
  },
  data() {
    return {
      api: new this.$Api('root')
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let url = `notif`

      this.api.get(url, ({ status, data }) => {
        if (status == 200) {
          this.notif = data.map((nf) => ({
            content: nf.content,
            time: nf.time
          }))
          console.log(this.notif)
        }
      })
    }
  }
})
</script>
