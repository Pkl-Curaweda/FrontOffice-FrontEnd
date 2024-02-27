<template>
  <q-layout view="lHh LpR fFf">
    <q-header bordered class="bg-white text-black">
      <q-toolbar class="items-center text-white bg-primary">
        <q-toolbar
          class="text-weight-bold"
          style="display: flex; justify-content: space-between; align-items: center"
        >
          <img src="../../assets/img/lingian-logo.png" style="width: 50px; padding:5px;" />

          <!-- notification -->
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
        </q-toolbar>

        <div class="q-gutter-sm row items-center no-wrap">
          <ProfileFloat />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container style="overflow: hidden">
      <Transition name="slide-fade" appear mode="out-in">
        <router-view :key="$route.fullPath" />
      </Transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import ProfileFloat from 'src/components/ProfileFloat.vue'
import { useRouter } from 'vue-router'

export default {
  components: { ProfileFloat },
  setup() {
    const router = useRouter()
    return {}
  },
  data() {}
}
</script>

<style>
.breadcrumb-bg {
  background-color: #c9f4c9;
}
</style>
