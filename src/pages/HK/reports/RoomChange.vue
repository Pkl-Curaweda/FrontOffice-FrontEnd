<template>
  <q-page class="flex flex-center q-px-lg q-py-xl">
    <HKCard
      title="Guest Room Change List"
      radius="25px"
      card_class="full-width q-px-lg"
      style="max-height: 719px"
    >
      <FormDate />

      <!-- Table -->
      <HKTable :columns="columns" :rows="rows" class="q-mt-md" />
    </HKCard>
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'
import FormDate from 'src/components/general/Date.vue'
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'change-date',
    required: true,
    label: 'Change Date',
    align: 'left',
    field: (row) => row.changeDate,
    sortable: true
  },
  {
    name: 'arrival',
    align: 'left',
    label: 'Arrival',
    field: 'arrival',
    sortable: true
  },
  {
    name: 'depart',
    align: 'left',
    label: 'Depart',
    field: 'depart',
    sortable: true
  },
  {
    name: 'time',
    label: 'Pax',
    field: 'time',
    sortable: true,
    align: 'left'
  },
  {
    name: 'room no',
    label: 'RmNo',
    field: 'rmNo',
    align: 'left'
  },
  {
    name: 'move to',
    label: 'MoveTo',
    field: 'moveTo',
    align: 'left'
  },

  {
    name: 'reason',
    label: 'Reason',
    field: 'reason',
    sortable: true,
    align: 'left'
  },
  {
    name: 'res no',
    label: 'ResNo',
    field: 'resNo',
    align: 'left'
  },
  {
    name: 'geust name',
    label: 'Guest Name',
    field: 'guestName',
    align: 'left'
  }
]

const rows = [
  {
    changeDate: '12/02/23',
    arrival: '12/02/23',
    depart: '12/02/23',
    time: '12:48',
    rmNo: '101',
    moveTo: '110',
    reason: 'Kamar ada serangga',
    resNo: '18086',
    guestName: 'RONO RUSTAN'
  },
  {
    changeDate: '12/02/23',
    arrival: '12/02/23',
    depart: '12/02/23',
    time: '12:48',
    rmNo: '101',
    moveTo: '110',
    reason: 'Kamar ada serangga',
    resNo: '18086',
    guestName: 'RONO RUSTAN'
  },
  {
    changeDate: '12/02/23',
    arrival: '12/02/23',
    depart: '12/02/23',
    time: '12:48',
    rmNo: '101',
    moveTo: '110',
    reason: 'Kamar ada serangga',
    resNo: '18086',
    guestName: 'RONO RUSTAN'
  },
  {
    changeDate: '12/02/23',
    arrival: '12/02/23',
    depart: '12/02/23',
    time: '12:48',
    rmNo: '101',
    moveTo: '110',
    reason: 'Kamar ada serangga',
    resNo: '18086',
    guestName: 'RONO RUSTAN'
  },
  {
    changeDate: '12/02/23',
    arrival: '12/02/23',
    depart: '12/02/23',
    time: '12:48',
    rmNo: '101',
    moveTo: '110',
    reason: 'Kamar ada serangga',
    resNo: '18086',
    guestName: 'RONO RUSTAN'
  }
]

export default defineComponent({
  name: 'RoomChangePage',
  components: { HKCard, HKTable, FormDate },
  data() {
    return {
      columns,
      rows
    }
  },
  setup() {
    return {
      roomInput: ref(''),
      toRoomInput: ref(''),
      locationInput: ref(''),

      allRoomsCheck: ref(false),
      oddRoomsCheck: ref(false),
      evenRoomsCheck: ref(false)
    }
  }
})
</script>
