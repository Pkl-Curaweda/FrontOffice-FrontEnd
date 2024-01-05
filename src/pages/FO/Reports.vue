<template>
  <q-page class="column" style="overflow-y: hidden; min-width: max-content">
    <FOMenubar>
      <template #left>
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          label="Sorting"
          dropdown-icon="o_expand_more"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Most Revenue</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Less Revenue</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical />

        <q-input v-model="searchInput" borderless dense label="Name" type="search">
          <template v-slot:prepend>
            <q-icon name="search" class="q-ml-sm" color="primary" />
          </template>
        </q-input>
        <q-separator vertical />

        <q-btn-dropdown
          flat
          square
          range
          class="text-capitalize"
          label="TDate - FDate"
          icon="o_event"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          flat
          square
          range
          class="text-capitalize text-black"
          label="Display Option"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Day</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Week</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Month</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Year</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>

      <template #right>
        <q-chip>right side</q-chip>
      </template>
    </FOMenubar>

    <MultiPane>
      <template #upper> </template>

      <template #lower>
        <ReportInsight />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import ReportInsight from 'src/pages/FO/fragments/ReportInsight.vue'

export default defineComponent({
  name: 'ReportsPage',
  components: { FOMenubar, ReportInsight, MultiPane }
})
</script>
