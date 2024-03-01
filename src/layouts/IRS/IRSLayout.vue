<template>
  <q-layout view="lHh LpR fFf" class="bg-white">
    <q-header
      v-if="$route.path != '/irs/home/profile'"
      class="bg-transparent text-black"
      >
      <q-toolbar
      style="width: 100%;"
        class="items-center text-white q-py-xs"
        :class="$route.path == '/irs/home' ? ' bg-primary ' : 'text-black'"
      >
        <q-toolbar
          class="text-weight-bold"
          style="display: flex; justify-content: space-between; align-items: center"
        >
          <q-btn
            v-if="$route.path != '/irs/home'"
            dense
            flat
            round
            icon="menu"
            @click="toggleLeftDrawer"
          />

          <div
            v-if="$route.path != '/irs/home'"
            class="q-my-auto"
            style="width: 100%; text-align: center"
          >
            {{ $route.meta.title }}
          </div>
          <div style="display: flex">
            <div v-if="$route.path != '/irs/home'" style="display: flex">
              <template v-for="(r, index) in irsuser_routes" :key="index">
                <q-item :to="r.path" v-if="r.meta.main_route == false">
                  <q-item-section avatar>
                    <q-icon size="2rem" class="material-symbols-outlined" :name="r.meta.icon" />
                  </q-item-section>
                </q-item>
              </template>
            </div>
          </div>
          <div
              v-if="$route.path == '/irs/home'"
              style="display: flex; justify-content: space-between; width: 100%;align-items: center;"
            >
              <img src="../../assets/img/lingian-logo.png" style="width: 40px" />

              <!-- notification -->
              <div
                v-if="$route.path == '/irs/home'"
                style="display: flex; justify-content: end; width: 100%; gap: 10px; align-items: center;"
              >
                <q-btn round dense flat icon="o_notifications">
                  <q-badge color="negative" text-color="white" floating> 2</q-badge>
                  <q-tooltip>Notifications</q-tooltip>
                  <q-menu fit anchor="bottom left" self="top left" style="width: 300px">
                    <q-item class="bg-primary text-white">
                      <q-item-section>Messages</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>
                        <div class="row items-center justify-between">
                          <div>
                            <div class="row items-center">
                              <div class="q-ma-none">hallo</div>
                            </div>
                            <p class="text-body2 q-ma-none">hallo</p>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-menu>
                </q-btn>
                <div class="q-gutter-sm row items-center no-wrap" @click="moveProfile()">
                  <q-avatar size="26px">
                    <img :src="user.picture" />
                  </q-avatar>
                </div>
              </div>
            </div>

        </q-toolbar>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <SideBarInroom />
    </q-drawer>

    <q-page-container>
      <Transition name="slide-fade" appear mode="out-in">
        <router-view :key="$route.fullPath" />
      </Transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'
import SideBarInroom from 'src/components/IRSsideBar.vue'
import { defineComponent, ref } from 'vue'
import {
  inroomservice_routes,
  irsuser_routes,
  irsmitra_routes
} from 'src/router/inroomservice.router'

export default defineComponent({
  components: { SideBarInroom },
  setup() {
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    return {
      irsmitra_routes,
      inroomservice_routes,
      irsuser_routes,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data() {
    return {
      api: new this.$Api('root'),
      user: this.$AuthStore.getUser()
    }
  },
  methods: {
    moveProfile() {
      this.$router.push({
        name: 'Profile'
      })
    }
  }
})
</script>

<style>
.breadcrumb-bg {
  background-color: #c9f4c9;
}
</style>
