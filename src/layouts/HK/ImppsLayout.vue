<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title class="row items-center justify-between">
          <div>
            <q-icon name="chevron_left" size="30px" @click="goBack" style="cursor: pointer" />
            <q-btn flat round dense icon="o_notifications" size="20px" @click="getNotif">
              <q-badge color="red" v-if="notifNumber > 0" floating> {{ notifNumber }}</q-badge>
              <q-menu>
                <q-list style="min-width: 250px">
                  <q-item style="background-color: #cccccc">
                    <q-item-section>Notification</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    class="row items-center justify-between"
                    v-for="(data, key, i) in notif"
                    :key="i"
                  >
                    <q-item-section>
                      <div class="text-body1">{{ data.content }}</div>
                      <div class="text-caption">{{ data.time }}</div>
                    </q-item-section>
                    <q-item-section class="absolute-right q-mr-md">
                      <div
                        class="bg-primary"
                        style="width: 10px; height: 10px; border-radius: 100%"
                      ></div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div class="q-py-md">
            <div>
              <img src="../../../public/images/Lingian-Logo-3.png" alt="logo" style="width: 55px" />
            </div>
          </div>
          <div>
            <q-btn
              dense
              no-caps
              color="white"
              class="text-dark text-caption cursor-pointer q-py-xs q-px-sm"
              style="border-radius: 10px"
              icon="logout"
              label="Logout"
              @click="logout"
            />
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import socket from '../../services/socket/socket'

export default defineComponent({
  name: 'immpsLayout',
  data() {
    return {
      api: new this.$Api('root'),
      user: this.$AuthStore.getUser(),
      logout_loading: false,
      notifNumber: ref(),
      notif: []
    }
  },
  watch: {},
  mounted() {
    this.getValue()
    this.fetchData()
    this.socket()
  },
  beforeUnmount() {
    socket.disconnect()
  },
  methods: {
    socket() {
      socket.on('notif', () => {
        this.getValue()
        this.fetchData()
      })
    },
    goBack() {
      this.$router.go(-1)
    },
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
    },
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
