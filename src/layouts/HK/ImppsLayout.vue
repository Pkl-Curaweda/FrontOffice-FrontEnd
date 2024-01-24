<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title class="row items-center justify-between">
          <div>
            <q-icon name="chevron_left" size="30px" @click="goBack" style="cursor: pointer" />
            <q-btn flat round dense icon="o_notifications" size="20px">
              <q-badge color="red" floating>4</q-badge>
              <q-menu>
                <q-list style="min-width: 250px">
                  <q-item style="background-color: #cccccc">
                    <q-item-section>Notification</q-item-section>
                  </q-item>
                  <q-item clickable class="row items-center justify-between">
                    <q-item-section>
                      <div class="text-body1">Amfinakamm</div>
                      <div class="text-caption">2 hours ago</div>
                    </q-item-section>
                    <q-item-section class="absolute-right q-mr-md">
                      <div
                        class="bg-primary"
                        style="width: 10px; height: 10px; border-radius: 100%"
                      ></div>
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>
                      <div class="text-body1">Amfinakamm</div>
                      <div class="text-caption">2 hours ago</div>
                    </q-item-section>
                    <q-item-section class="absolute-right q-mr-md">
                      <div
                        class="bg-primary"
                        style="width: 10px; height: 10px; border-radius: 100%"
                      ></div>
                    </q-item-section>
                  </q-item>
                  <q-separator />

                  <q-item clickable>
                    <q-item-section>
                      <div class="text-body1">Amfinakamm</div>
                      <div class="text-caption">2 hours ago</div>
                    </q-item-section>
                  </q-item>
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
export default {
  name: 'immpsLayout',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
