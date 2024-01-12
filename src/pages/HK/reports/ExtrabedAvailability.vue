<template>
  <q-page class="flex flex-center">
    <div class="dashboard-box column q-ma-md" style="padding: 0">
      <p class="text-center breadcrumb-bg q-pa-sm relative" style="width: 100%; border-radius: 10px 10px 0 0">Extra Bed Availability</p>
      <q-btn flat square color="primary" icon="o_print" class="self-end q-ma-none" />
      <div class="justify-between row q-px-sm" style="width: 100%">
        <!-- ==========Date=============== -->
        <div class="row" style="gap: 16px">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 14px; font-weight: 500">From Date :</span>
            <HKDateInput />
          </div>

          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 14px; font-weight: 500">To Date :</span>
            <HKDateInput />
          </div>
        </div>
        <!-- ====== -->
        <div class="row items-center" style="column-gap: 8px">
          <span style="font-size: 14px; font-weight: 500">Sorting :</span>
          <q-select
            outlined
            dense
            v-model="sortingModel"
            dropdown-icon="expand_more"
            :options="sortingOptions"
            style="width: 12rem"
            class="input-border"
          />
        </div>
      </div>
      <HKTable :columns="tableColumns" :rows="tableRows" style="width: 100%" />
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import HKDateInput from 'src/components/HK/Form/HKDateInput.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'

const tableColumns = [
  {
    name: 'date',
    label: 'Date',
    field: 'date',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'room_no',
    label: 'Room No',
    field: 'room_no',
    align: 'left',
    sortable: true
  },
  {
    name: 'used',
    label: 'Used',
    field: 'used',
    align: 'left',
    sortable: true
  },
  {
    name: 'remain',
    label: 'Remain',
    field: 'remain',
    align: 'left',
    sortable: true
  }
]

const tableRows = [
  {
    date: '10/02/23',
    room_no: '101',
    used: '2',
    remain: '8',
  },
  {
    date: '10/02/23',
    room_no: '101',
    used: '2',
    remain: '8',
  },
  {
    date: '10/02/23',
    room_no: '101',
    used: '2',
    remain: '8',
  },
  {
    date: '10/02/23',
    room_no: '101',
    used: '2',
    remain: '8',
  },
  {
    date: '10/02/23',
    room_no: '101',
    used: '2',
    remain: '8',
  },
]

export default defineComponent({
  name: 'ExtrabedPage',
  components: { HKDateInput, HKTable },
  setup() {
    return {
      sortingModel: ref('Extra Bed'),
      sortingOptions: ['Extra Bed', 'Pillow', 'Blanket'],
      tableColumns,
      tableRows
    }
  }
})
</script>
