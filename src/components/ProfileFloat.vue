<template>
  <q-btn round dense flat>
    <q-avatar size="26px">
      <img :src="user.picture" />
    </q-avatar>
    <q-menu fit anchor="bottom left" self="top left" style="max-width: 320px">
      <q-item>
        <q-item-section>
          <q-img
            :src="user.picture"
            class="q-my-md q-mx-auto"
            style="width: 100px; border-radius: 100px"
          />
          <h5 class="q-mt-none q-mb-md text-center">Halo, {{ user.name }}</h5>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable class="text-negative" @click="logout" :disable="logout_loading">
        <q-item-section avatar>
          <q-icon name="o_logout" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="rounded-borders">Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'
import socket from 'src/services/socket/socket'

export default defineComponent({
  name: 'ProfileFloat',

  data() {
    return {
      api: new this.$Api('root'),
      user: this.$AuthStore.getUser(),
      logout_loading: false
    }
  },
  beforeUnmount(){
    socket.disconnect()
  },
  methods: {
    logout() {
      this.logout_loading = true

      this.api.useToken(false).post('auth/user/logout', {}, ({ status }) => {
        if (status == 200) {
          this.$Config.logout()
          this.$AuthStore.clearData()
          this.$Helper.showNotif('Logout Success', '', 'positive')

          this.$router.go('/auth/login')
        } else {
          this.$Helper.showNotif('Logout unsuccess', '', 'negative')
        }

        this.logout_loading = false
      })
    }
  }
})
</script>
