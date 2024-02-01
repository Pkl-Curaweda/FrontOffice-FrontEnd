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
    label: 'Change Date',
    align: 'left',
    field: 'changeDate',
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
    name: 'guest name',
    label: 'Guest Name',
    field: 'guestName',
    align: 'left'
  }
]

const rows = ref()

export default defineComponent({
  name: 'RoomChangePage',
  components: { HKCard, HKTable, FormDate },
  setup() {
    return {
      roomInput: ref(''),
      toRoomInput: ref(''),
      locationInput: ref(''),
      columns,
      rows,
      allRoomsCheck: ref(false),
      oddRoomsCheck: ref(false),
      evenRoomsCheck: ref(false)
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping')
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

      let url = `roomchange`

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { roomChangeData } = data

          this.rows = roomChangeData.map((rcd) => ({
            changeDate: rcd.changeDate,
            arrival: rcd.arrival,
            depart: rcd.departure,
            time: rcd.time,
            rmNo: rcd.roomNo,
            moveTo: rcd.moveTo,
            reason: rcd.reason,
            resNo: rcd.resvNo,
            guestName: rcd.guestName
          }))

          console.log(this.rows)
        }
      })
    }
  }
})
</script>
