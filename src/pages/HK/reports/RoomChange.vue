<template>
  <q-page class="flex flex-center q-px-lg q-py-xl">
    <HKCard
      title="Guest Room Change List"
      radius="25px"
      card_class="full-width q-px-lg"
      style="max-height: 719px"
    >
      <div>
        <div class="row q-ml-auto">
          <div class="row q-pr-lg q-gutter-sm arrival">
            <div>
              <p class="text-weight-bold text-body1 q-mt-sm">From Date :</p>
            </div>
            <div>
              <q-btn-dropdown
                flat
                square
                style="border: 1px #00000030 solid"
                class="text-capitalize date-btn text-black rounded-borders"
                :label="datePickerArrival?.replace(/\//g, '-')"
                icon="o_event"
                color="primary"
                dropdown-icon="o_expand_more"
              >
                <div>
                  <q-date v-model="datePickerArrival" color="green" today-btn />
                </div>
              </q-btn-dropdown>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div>
              <p class="text-weight-bold text-body1 q-mt-sm">To Date :</p>
            </div>
            <div>
              <q-btn-dropdown
                flat
                square
                style="border: 1px #00000030 solid"
                class="text-capitalize date-btn text-black rounded-borders"
                :label="datePickerDeparture?.replace(/\//g, '-')"
                icon="o_event"
                color="primary"
                dropdown-icon="o_expand_more"
              >
                <div>
                  <q-date v-model="datePickerDeparture" color="green" today-btn />
                </div>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
      </div>
      <!-- Table -->
      <HKTable :columns="columns" :rows="rows" class="q-mt-md" />
    </HKCard>
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'
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
  components: { HKCard, HKTable },
  setup() {
    return {
      roomInput: ref(''),
      toRoomInput: ref(''),
      locationInput: ref(''),
      columns,
      rows,
      allRoomsCheck: ref(false),
      oddRoomsCheck: ref(false),
      evenRoomsCheck: ref(false),
      datePickerArrival: ref('Date'),
      datePickerDeparture: ref('Date'),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref()
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
  watch: {
    datePickerArrival: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    },
    datePickerDeparture: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    }
  },
  methods: {
    fetchData() {
      this.loading = true

      let url = `roomchange?`

      const DateArrival = this.datePickerArrival?.replace(/\//g, '-')
      if (DateArrival !== undefined && DateArrival !== '') {
        url += `&from=${DateArrival}`
      }

      const DateDeparture = this.datePickerDeparture?.replace(/\//g, '-')
      if (DateDeparture !== undefined && DateDeparture !== '') {
        url += `&to=${DateDeparture}` // Ganti 'arrival' dengan 'departure'
      }

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
