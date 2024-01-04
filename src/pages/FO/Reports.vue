<template>
  <q-page class="column" style="overflow-y: hidden; min-width: max-content">
    <FOMenubar>
      <template #left>
        <q-chip>Left side</q-chip>
      </template>
      <template #right>
        <q-chip>right side</q-chip>
      </template>
    </FOMenubar>

    <MultiPane>
      <template #upper>
        <div class="my-table">
          <q-table
            class="no-shadow"
            v-model:pagination="pagination"
            @request="onPaginationChange"
            :rows="data"
            :loading="loading"
            :columns="columns"
            row-key="name"
          >
            <template>
              <q-tr class="table-head">
                <q-th style="padding-top: 0px; padding-bottom: 0px">
                  <template v-slot:header="props">
                    <q-tr class="table-head" :props="props">
                      <q-th
                        v-for="(col, i) in props.cols"
                        :key="i"
                        style="padding-top: 0px; padding-bottom: 0px"
                      >
                      </q-th>
                    </q-tr>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props"> </q-tr>
                  </template>
                </q-th>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
      <template #lower>
        <ReportInsight />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import ReportInsight from 'src/pages/FO/fragments/ReportInsight.vue'

export default defineComponent({
  name: 'ReportsPage',
  components: { FOMenubar, ReportInsight, MultiPane },
  setup() {
    return {
      columns: [
        { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
        { name: 'RmAvailable', label: 'Room Available', align: 'left', field: 'RmAvailable' },
        { name: 'Occupied', label: 'Occupied', align: 'left', field: 'Occupied' },
        { name: 'Occ', label: 'Occ%', align: 'left', field: 'Occ%' },
        { name: 'RmRevenue', label: 'Room Revenue', align: 'left', field: 'RmRevenue' },
        { name: 'Arr', label: 'Arr', align: 'left', field: 'Arr' },
        { name: 'MTDRmAvail', label: 'MTD Rm. Avail', field: 'MTDRmAvail', align: 'left' },
        { name: 'MTDRNo', label: 'MTD RNo', align: 'left', field: 'MTDRNo' },
        { name: 'MTDOcc', label: 'MTD Occ%', align: 'left', field: 'MTDOcc%' },
        { name: 'MTDRmRevenue', label: 'MTD Rm. Revenue', align: 'left', field: 'MTDRmRevenue' },
        { name: 'MTDARR', label: 'MTD ARR', align: 'left', field: 'MTDARR' }
      ]
    }
  }
})
</script>
