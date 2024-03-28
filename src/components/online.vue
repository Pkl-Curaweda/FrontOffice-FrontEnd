<template>
  <q-list
    @mouseover="upHere = true"
    @mouseleave="upHere = false"
    bordered
    style="max-width: 250px; margin: 20px; border-radius: 0.375rem"
  >
    <q-item
      v-for="(user, key, i) in users"
      :key="i"
      clickable
      v-ripple
      style="display: flex; justify-content: space-between"
    >
      <q-item-section>{{ user }}</q-item-section>
      <q-item-section style="color: green; text-align: right; font-size: small"
        >Online</q-item-section
      >
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent, ref } from 'vue'
import socket from '../services/socket/socket'

export default defineComponent({
  name: 'online',
  setup() {
    return {
      data: ref(),
      users: ref([])
    }
  },
  data() {
    return {
      upHere: false,
      width: ref()
    }
  },
  watch: {},
  mounted() {
    socket.connect()
    socket.on('online', (onlineUsers) => {
      console.log(onlineUsers)
      this.users = onlineUsers
    })
  }
})
</script>

<style></style>
