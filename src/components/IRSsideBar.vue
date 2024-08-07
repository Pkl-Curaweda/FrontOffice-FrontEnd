<template>
  <q-scroll-area class="fit q-px-sm comp-sidebar">
    <q-toolbar class="GPL__toolbar">
      <q-toolbar-title class="flex flex-center">
        <q-img src="../assets/img/lingian-logo-colored.png" class="q-my-md" style="width: 120px" />
      </q-toolbar-title>
    </q-toolbar>

    <template v-for="(r, index) in inroomservice_routes" :key="index">
      <q-item :to="r.path" clickable class="q-py-sm">
        <q-item-section avatar>
          <q-icon size="2rem" class="material-symbols-outlined" :name="r.meta.icon" />
        </q-item-section>
        <q-item-section style="text-align: left">
          {{ r.meta.title }}
        </q-item-section>
      </q-item>
    </template>

    <template v-for="(r, index) in irsuser_routes" :key="index">
      <q-item :to="r.path" clickable class="q-py-sm">
        <q-item-section avatar>
          <q-icon size="2rem" class="material-symbols-outlined" :name="r.meta.icon" />
        </q-item-section>
        <q-item-section style="text-align: left">
          {{ r.meta.title }}
        </q-item-section>
      </q-item>
    </template>
    <q-item clickable class="text-negative" @click="logout()">
      <q-item-section avatar class="q-pa-none">
        <q-icon name="o_logout" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="rounded-borders">Logout</q-item-label>
      </q-item-section>
    </q-item>
  </q-scroll-area>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  inroomservice_routes,
  irsuser_routes,
  irsmitra_routes
} from 'src/router/inroomservice.router'

export default defineComponent({
  name: 'SideBarInroom',
  setup() {
    return {
      irsmitra_routes,
      inroomservice_routes,
      irsuser_routes
    }
  },
  data() {
    return {
      api: new this.$Api('root'),
      user: this.$AuthStore.getUser()
    }
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
