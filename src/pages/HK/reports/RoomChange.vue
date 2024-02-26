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
      <div :class="`tableComp ${gapColorClass}`" class="my-table">
        <q-table
          :rows="rows"
          :columns="columns"
          :pagination="pagination"
          :rows-per-page-options="[1, 5, 7, 10, 15, 20, 25, 30]"
          row-key="name"
          square
          :table-header-style="{
            backgroundColor: '#069550',
            color: '#ffffff',
            padding: '10px'
          }"
          :card-style="{ boxShadow: 'none' }"
          rows-per-page-label="Show"
          :dense="$q.screen.lt.md"
          :title="title"
          @request="onPaginationChange"
          v-model:pagination="pagination"
          style="height: 300px"
        />
      </div>
    </HKCard>
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'change-date',
    label: 'Change Date',
    align: 'center',
    field: 'changeDate',
    sortable: true
  },
  {
    name: 'arrival',
    align: 'center',
    label: 'Arrival',
    field: 'arrival',
    sortable: true
  },
  {
    name: 'depart',
    align: 'center',
    label: 'Depart',
    field: 'depart',
    sortable: true
  },
  {
    name: 'time',
    label: 'Pax',
    field: 'time',
    sortable: true,
    align: 'center'
  },
  {
    name: 'room no',
    label: 'RmNo',
    field: 'rmNo',
    align: 'center'
  },
  {
    name: 'move to',
    label: 'MoveTo',
    field: 'moveTo',
    align: 'center'
  },

  {
    name: 'reason',
    label: 'Reason',
    field: 'reason',
    sortable: true,
    align: 'center'
  },
  {
    name: 'res no',
    label: 'ResNo',
    field: 'resNo',
    align: 'center'
  },
  {
    name: 'guest name',
    label: 'Guest Name',
    field: 'guestName',
    align: 'center'
  }
]

const rows = ref()

export default defineComponent({
  name: 'RoomChangePage',
  components: { HKCard },
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
      datePickerArrival: ref(),
      datePickerDeparture: ref(),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref()
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping'),
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      }
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
    onPaginationChange(props) {
      props.pagination.rowsPerPage =
        props.pagination.rowsPerPage < 1 ? 50 : props.pagination.rowsPerPage
      // console.log(props)
      // console.log(props.rowsPerPage)
      this.pagination = props.pagination
      this.fetchData()
    },
    fetchData() {
      this.loading = true

      let url = `roomchange?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`

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

          const fromArrival = data.from
          if (this.datePickerArrival == null) {
            this.datePickerArrival = fromArrival
          }

          const toArrival = data.to
          if (this.datePickerDeparture == null) {
            this.datePickerDeparture = toArrival
          }

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
