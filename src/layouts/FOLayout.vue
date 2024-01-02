<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar class="items-center">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> {{ $route.meta.title }} </q-toolbar-title>

        <q-space />
        <p class="q-mb-none text-bold text-subtitle1">{{ currentTime }}</p>
        <q-space />

        <div class="q-gutter-sm col-grow row justify-end items-center no-wrap">
          <MessengerFloat />
          <ProfileFloat />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <SideBar />
    </q-drawer>

    <q-page-container style="height: 100vh; overflow-y: hidden; overflow-x: auto">
      <Transition name="slide-fade" appear mode="out-in">
        <router-view :key="$route.fullPath" />
      </Transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from 'vue'
import SideBar from 'src/components/SideBar.vue'
import MessengerFloat from 'src/components/MessengerFloat.vue'
import { getCurrentTime } from 'src/utils/time'
import ProfileFloat from 'src/components/ProfileFloat.vue'

export default defineComponent({
  name: 'FrontOfficeLayout',
  components: { SideBar, MessengerFloat, ProfileFloat },
  setup() {
    const leftDrawerOpen = ref(false)
    const currentTime = getCurrentTime()

    return {
      currentTime,
      leftDrawerOpen
    }
  },
  created() {
    setInterval(() => {
      this.currentTime = getCurrentTime()
    }, 60000)
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>
