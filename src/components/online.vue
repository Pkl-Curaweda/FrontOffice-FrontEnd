<template>
  <q-dialog v-model="open" seamless position="top">
    <q-card>
      <q-list 
        bordered
        style="min-width: 300px; margin: 20px; border-radius: 0.375rem"
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
    </q-card>
  </q-dialog>
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
      count: ref(0),
      open: ref(false),
      upHere: false,
      width: ref()
    }
  },
  mounted() {
    window.addEventListener('keydown', this.openDialog)
    socket.connect()
    socket.on('online', (onlineUsers) => {
      console.log(onlineUsers)
      this.users = onlineUsers
    })
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.openDialog);
  },
  methods: {
    openDialog(event){
      if(event.ctrlKey && event.key === 'k'){
        event.preventDefault();
        this.open = !this.open
      }
    }
  }
})
</script>

<style></style>
