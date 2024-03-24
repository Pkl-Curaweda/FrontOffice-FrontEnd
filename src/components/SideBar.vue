<template>
  <q-scroll-area class="fit q-px-sm comp-sidebar">
    <q-toolbar class="GPL__toolbar">
      <q-toolbar-title class="flex flex-center">
        <q-img src="../assets/img/lingian-logo-colored.png" class="q-my-md" style="width: 180px" />
      </q-toolbar-title>
    </q-toolbar>

    <q-item to="/fo/dashboard" clickable>
      <q-item-section avatar>
        <q-icon size="2rem" name="o_dashboard" />
      </q-item-section>
      <q-item-section>Dashboard</q-item-section>
    </q-item>

    <q-expansion-item class="rounded" label="Front Office" icon="o_contact_page">
      <template v-for="(r, index) in frontoffice_routes" :key="index">
        <q-item v-if="r.meta.main_route" class="q-mx-md" :to="r.path" clickable>
          <q-item-section>
            {{ r.meta.title }}
          </q-item-section>
        </q-item>
      </template>
    </q-expansion-item>

    <q-expansion-item class="rounded" label="House Keeping" icon="o_cleaning_services">
      <template v-for="(r, index) in housekeeping_routes" :key="index">
        <q-item class="q-mx-md" :to="r.path" clickable>
          <q-item-section>
            {{ r.meta.title }}
          </q-item-section>
        </q-item>
      </template>
      <q-expansion-item class="rounded q-mx-md" label="Reports">
        <template v-for="(r, index) in hkreports_routes" :key="index">
          <q-item class="q-mx-md" :to="r.path" clickable>
            <q-item-section>
              {{ r.meta.title }}
            </q-item-section>
          </q-item>
        </template>
      </q-expansion-item>
    </q-expansion-item>

    <!-- <q-separator class="q-my-md" /> -->

    <!-- <q-item clickable class="text-negative">
      <q-item-section avatar class="q-pa-none">
        <q-icon name="o_logout" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="rounded-borders">Logout</q-item-label>
      </q-item-section>
    </q-item> -->
  </q-scroll-area>
</template>

<script>
import { defineComponent } from 'vue'
import frontoffice_routes from 'src/router/frontoffice.router'
import { housekeeping_routes, hkreports_routes } from 'src/router/housekeeping.router'

export default defineComponent({
  name: 'SideBar',
  setup() {
    return {
      frontoffice_routes,
      housekeeping_routes,
      hkreports_routes
    }
  }
})
</script>
