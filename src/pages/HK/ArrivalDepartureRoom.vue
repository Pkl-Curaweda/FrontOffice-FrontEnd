<template>
  <q-page class="column q-px-lg q-py-md" style="row-gap: 24px">
    <div class="flex" style="gap: 24px">
      <HKCard card_style="flex: 1 1 0%; padding-inline: 24px;">
        <span class="text-h6" style="font-weight: 600">Arrival</span>
        <table class="full-width">
          <tr>
            <td></td>
            <td align="center">Room</td>
            <td align="center">Person</td>
          </tr>
          <tr v-for="(data, index) in arrivalData" :key="index">
            <td style="padding: 4px">{{ data.label }}</td>
            <td align="center" style="padding: 4px">
              <q-card class="q-py-xs">
                {{ data.room }}
              </q-card>
            </td>
            <td align="center" style="padding: 4px">
              <q-card class="q-py-xs">
                {{ data.person }}
              </q-card>
            </td>
          </tr>
        </table>
      </HKCard>
      <HKCard card_style="flex: 1 1 0%; padding-inline: 24px;">
        <span class="text-h6" style="font-weight: 600">Departure</span>
        <table class="full-width">
          <tr>
            <td></td>
            <td align="center">Room</td>
            <td align="center">Person</td>
          </tr>
          <tr v-for="(data, index) in departureData" :key="index">
            <td style="padding: 4px">{{ data.label }}</td>
            <td align="center" style="padding: 4px">
              <q-card class="q-py-xs">
                {{ data.room }}
              </q-card>
            </td>
            <td align="center" style="padding: 4px">
              <q-card class="q-py-xs">
                {{ data.person }}
              </q-card>
            </td>
          </tr>
        </table>
      </HKCard>
    </div>

    <!-- Table -->
    <div class="full-width">
      <!-- Filtering -->
      <div class="flex q-mb-sm justify-between col-grow" style="gap: 8px">
        <div class="flex">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Sorting :</span>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize text-black rounded-borders"
              :label="filterDisplayLabel"
              color="primary"
              dropdown-icon="o_expand_more"
            >
              <q-list v-for="(type, i) in listOfSortTypes" :key="i">
                <q-item clickable v-close-popup @click="setFilterDisplay(type.id, type.label)">
                  <q-item-section>{{ type.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <!-- <q-btn
            outline
            dense
            @click="guestHistoryModel = true"
            style="width: 12rem; color: #d9d9d9; padding-inline: 16px"
            align="left"
            no-caps
          >
            <q-icon name="history" style="color: #616161; margin-right: 8px" />
            <div style="color: #616161">Guest History</div>
          </q-btn> -->
        </div>

        <!-- Dates -->
        <div class="flex" style="gap: 16px">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Arrival :</span>
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

          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Departure :</span>
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
            <q-input
              outlined
              dense
              v-model="searchInput"
              class="input-border"
              label="Search ResNo/NIK"
              style="width: fit-content"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <q-table
        :rows="tableRows"
        :columns="tableColumns"
        row-key="name"
        square
        class="q-px-md my-table"
        :table-header-style="{
          backgroundColor: '#069550',
          color: '#ffffff',
          padding: '9px'
        }"
        :card-style="{ boxShadow: 'none' }"
        rows-per-page-label="Show"
        v-model:pagination="pagination"
        :rows-per-page-options="[1, 5, 7, 10, 15, 20, 25, 30]"
        @request="onPaginationChange"
        :dense="$q.screen.lt.md"
      >
        <template v-slot:body="props">
          <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
            <q-td key="res_no" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="res_resource" :props="props">
              {{ props.row.res_resource }}
            </q-td>
            <q-td
              key="rm_no"
              :props="props"
              :style="{
                backgroundColor: props.row.roomNo ? props.row.roomNo.backgroundColor : '',
                color: props.row.roomNo ? props.row.roomNo.textColor : ''
              }"
            >
              {{ props.row.rm_no }}
            </q-td>
            <q-td key="r_type" :props="props">
              {{ props.row.r_type }}
            </q-td>
            <q-td key="b_type" :props="props">
              {{ props.row.b_type }}
            </q-td>
            <q-td key="guest_name" :props="props">
              {{ props.row.guest_name }}
            </q-td>
            <q-td key="nik" :props="props">
              {{ props.row.nik.cardId }}
            </q-td>
            <q-td key="arr" :props="props">
              {{ props.row.arr }}
            </q-td>
            <q-td key="arrival" :props="props">
              {{ props.row.arrival }}
            </q-td>
            <q-td key="depart" :props="props">
              {{ props.row.depart }}
            </q-td>
            <q-td key="night" :props="props">
              {{ props.row.night }}
            </q-td>
            <q-td key="room_boy" :props="props">
              {{ props.row.room_boy }}
            </q-td>
            <q-td key="room_stat" :props="props">
              {{ props.row.room_stat }}
            </q-td>
            <q-td key="created_date" :props="props">
              {{ props.row.created_date }}
            </q-td>
            <q-td key="Action" :props="props" style="width: 10px">
              <q-btn flat rounded size="13px" style="color: #008444"
                ><svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 13C8.8 13 9.57 12.93 10.31 12.82L13.22 9.91C11.89 10.59 10 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.13L15.39 7.74C15.57 7.56 15.78 7.42 16 7.3V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.04 3.06 17.72 7 17.97V16.13L7.17 15.96C3.84 15.76 2 14.46 2 14V11.77C3.61 12.55 5.72 13 8 13ZM8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2ZM15.13 10.83L17.17 12.87L11.04 19H9V16.96L15.13 10.83ZM18.85 11.19L17.87 12.17L15.83 10.13L16.81 9.15C17 8.95 17.33 8.95 17.53 9.15L18.85 10.47C19.05 10.67 19.05 11 18.85 11.19Z"
                    fill="#008444"
                  />
                </svg>
              </q-btn>
              <q-btn flat rounded size="13px" style="color: #269861"
                ><svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10.59V4.5C16 2.29 12.42 0.5 8 0.5C3.58 0.5 0 2.29 0 4.5V14.5C0 16.71 3.59 18.5 8 18.5C8.46 18.5 8.9 18.5 9.33 18.44C9.1129 17.8162 9.00137 17.1605 9 16.5V16.45C8.68 16.5 8.35 16.5 8 16.5C4.13 16.5 2 15 2 14.5V12.27C3.61 13.05 5.72 13.5 8 13.5C8.65 13.5 9.27 13.46 9.88 13.39C10.4127 12.5085 11.1638 11.7794 12.0607 11.2731C12.9577 10.7668 13.9701 10.5005 15 10.5C15.34 10.5 15.67 10.54 16 10.59ZM14 9.95C12.7 10.9 10.42 11.5 8 11.5C5.58 11.5 3.3 10.9 2 9.95V7.14C3.47 7.97 5.61 8.5 8 8.5C10.39 8.5 12.53 7.97 14 7.14V9.95ZM8 6.5C4.13 6.5 2 5 2 4.5C2 4 4.13 2.5 8 2.5C11.87 2.5 14 4 14 4.5C14 5 11.87 6.5 8 6.5ZM19 15.5V17.5H11V15.5H19Z"
                    fill="#269861"
                  />
                </svg>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <!-- Guest History Dialog -->
    <!-- <q-dialog v-model="guestHistoryModel">
      <q-card style="width: 100vw; max-width: 100vw; padding-block: 24px">
        <q-card-section class="flex justify-center text-h5">Guest List History</q-card-section>
        <q-card-section>
          <div class="flex justify-end q-mb-sm">
            <q-input
              outlined
              dense
              v-model="searchInput"
              class="input-border"
              label="Search ResNo/NIK"
              style="width: fit-content"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <HKTable
            v-model:pagination="pagination"
            @request="onPaginationChange"
            :columns="tableColumnsHistory"
            :rows="tableRowsHistory"
          />
        </q-card-section>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKDateInput from 'src/components/HK/Form/HKDateInput.vue'
import { defineComponent, ref } from 'vue'

const arrivalData = []

const tableColumns = [
  {
    name: 'res_no',
    required: true,
    label: 'ResNo',
    align: 'left',
    field: (row) => row.name,
    sortable: true
  },
  {
    name: 'res_resource',
    label: 'ResResource',
    field: 'res_resource',
    align: 'left',
    sortable: true
  },
  {
    name: 'rm_no',
    label: 'RmNo',
    field: 'rm_no',
    sortable: true,
    align: 'left'
  },
  {
    name: 'r_type',
    label: 'RType',
    field: 'r_type',
    sortable: true,
    align: 'left'
  },
  {
    name: 'b_type',
    label: 'BType',
    field: 'b_type',
    sortable: true,
    align: 'left'
  },
  {
    name: 'guest_name',
    label: 'Guest Name',
    field: 'guest_name',
    sortable: true,
    align: 'left'
  },
  {
    name: 'nik',
    label: 'NIK',
    field: 'nik',
    sortable: true,
    align: 'left'
  },
  {
    name: 'arr',
    label: 'Arr',
    field: 'arr',
    sortable: true,
    align: 'left'
  },
  {
    name: 'arrival',
    label: 'Arrival',
    field: 'arrival',
    sortable: true,
    align: 'left'
  },
  {
    name: 'depart',
    label: 'Depart',
    field: 'depart',
    sortable: true,
    align: 'left'
  },
  {
    name: 'night',
    label: 'Night',
    field: 'night',
    sortable: true,
    align: 'left'
  },
  {
    name: 'room_boy',
    label: 'Room Boy',
    field: 'room_boy',
    sortable: true,
    align: 'left'
  },
  {
    name: 'room_stat',
    label: 'Room Stat',
    field: 'room_stat',
    sortable: true,
    align: 'left'
  },
  {
    name: 'created_date',
    label: 'Created Date',
    field: 'created_date',
    sortable: true,
    align: 'left'
  }
]

// const tableColumnsHistory = [
//   {
//     name: 'res_no',
//     required: true,
//     label: 'ResNo',
//     align: 'left',
//     field: 'name',
//     sortable: true
//   },
//   {
//     name: 'res_resource',
//     label: 'ResResource',
//     field: 'res_resource',
//     align: 'left',
//     sortable: true
//   },
//   {
//     name: 'rm_no',
//     label: 'RmNo',
//     field: 'rm_no',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'r_type',
//     label: 'RType',
//     field: 'r_type',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'b_type',
//     label: 'BType',
//     field: 'b_type',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'nik',
//     label: 'NIK',
//     field: 'nik',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'guest_name',
//     label: 'Guest Name',
//     field: 'guest_name',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'arr',
//     label: 'Arr',
//     field: 'arr',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'arrival',
//     label: 'Arrival',
//     field: 'arrival',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'depart',
//     label: 'Depart',
//     field: 'depart',
//     sortable: true,
//     align: 'left'
//   },
//   {
//     name: 'night',
//     label: 'Night',
//     field: 'night',
//     sortable: true,
//     align: 'left'
//   }
// ]

const departureData = []

const tableRows = []

export default defineComponent({
  name: 'ArrivalPage',
  components: { HKCard },
  setup() {
    return {
      arrivalData: ref(),
      departureData: ref(),
      loading: ref(false),
      tableColumns,
      // tableColumnsHistory,
      filterDisplay: ref(),
      filterDisplayLabel: ref('Room Number'),
      inputtedDate: ref(),
      formattedDate: ref(),
      datePickerArrival: ref(),
      datePickerDeparture: ref(),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref(''),
      tableRows: ref(),
      tableRowsHistory: ref(),
      guestHistoryModel: ref(false),
      searchInput: ref(''),
      listOfSortTypes: ref([])
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
  watch() {
    searchName(this.searchInput)
  },
  watch: {
    datePickerArrival: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    },
    searchInput: {
      handler(newSearchInput) {
        this.searchName(newSearchInput)
      },
      immediate: true
    },
    filterDisplay(newOption) {
      // Update the label based on the selected option
      this.updateFilterDisplayLabel(newOption)
    },
    datePickerDeparture: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    },
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    }
  },

  methods: {
    searchName(searchInput) {
      // Make an API call to search based on searchInput
      // this.api.get(`arrival-departure?search=${searchInput}`, ({ status, data }) => {
      //   if (status === 200) {
      //     const { table } = data
      //     this.tableRowsHistory = table.map((row) => ({
      //       name: row.resNo,
      //       res_resource: row.resResource,
      //       rm_no: row.roomNo.id,
      //       r_type: row.roomType,
      //       b_type: row.bedType,
      //       nik: row.nik,
      //       guest_name: row.guestName,
      //       arr: row.arrangment.split('-')[1],
      //       arrival: row.arrival,
      //       depart: row.departure,
      //       night: row.night
      //     }))
      //   } else {
      //     console.error('Error searching data')
      //   }
      // })
      this.searchData = searchInput
      this.fetchData()
    },
    onPaginationChange(props) {
      props.pagination.rowsPerPage =
        props.pagination.rowsPerPage < 1 ? 50 : props.pagination.rowsPerPage
      this.pagination = props.pagination
      this.fetchData()
    },
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.filterDisplayLabel = label
    },
    fetchData() {
      this.loading = true

      let url = `arrival-departure?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}&search=${this.searchData}`

      const DateArrival = this.datePickerArrival?.replace(/\//g, '-')
      if (DateArrival !== undefined && DateArrival !== '') {
        url += `&arrival=${DateArrival}`
      }

      const DateDeparture = this.datePickerDeparture?.replace(/\//g, '-')
      if (DateDeparture !== undefined && DateDeparture !== '') {
        url += `&depart=${DateDeparture}` // Ganti 'arrival' dengan 'departure'
      }

      if (this.filterDisplay !== null) {
        url += `&sortOrder=${this.filterDisplay}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { arrival, departure, table } = data

          const arrivalDate = data.arr // Gantilah 'arrival.arr' dengan properti yang benar
          if (arrivalDate) {
            this.datePickerArrival = arrivalDate
          }

          const departureDate = data.dep // Gantilah 'data.dep' dengan properti yang benar
          if (departureDate) {
            this.datePickerDeparture = departureDate
          }

          // Mengisi arrivalData dan departureData dengan data dari respons API
          this.arrivalData = [
            {
              label: 'Checked In Today',
              room: arrival.checkInToday.split('-')[0], // Mengambil jumlah kamar
              person: arrival.checkInToday.split('-')[1] // Mengambil jumlah orang
            },
            {
              label: 'Arriving',
              room: arrival.arriving.split('-')[0],
              person: arrival.arriving.split('-')[1]
            },
            {
              label: 'Total Arrival',
              room: arrival.totalArrival.split('-')[0],
              person: arrival.totalArrival.split('-')[1]
            }
          ]

          this.departureData = [
            {
              label: 'Departed Today',
              room: departure.departedToday.split('-')[0],
              person: departure.departedToday.split('-')[1]
            },
            {
              label: 'Departing',
              room: departure.departing.split('-')[0],
              person: departure.departing.split('-')[1]
            },
            {
              label: 'Total Departure',
              room: departure.totalDeparture.split('-')[0],
              person: departure.totalDeparture.split('-')[1]
            }
          ]

          // Mengisi tableRows dengan data dari respons API
          this.tableRows = table.map((row) => ({
            rm_no_backgroundColor: row.roomNo.backgroundColor || '#ffffff',
            rm_no_textColor: row.roomNo.textColor || '#000000',
            name: row.resNo,
            res_resource: row.resResource,
            rm_no: row.roomNo.id,
            r_type: row.roomType,
            b_type: row.bedType,
            guest_name: row.guestName,
            nik: row.nik,
            arr: row.arrangment.split('-')[1],
            arrival: row.arrival,
            depart: row.departure,
            night: row.night,
            room_boy: row.roomBoy.user.name,
            room_stat: row.roomStatus.shortDescription,
            created_date: row.created
          }))

          console.log(this.listOfSortTypes)
          this.listOfSortTypes =
            this.listOfSortTypes.length < 1 ? data.sortingList : this.listOfSortTypes
        }
      })
    }
  }
})
</script>

<style>
.input-border .q-field__control::before {
  border-color: #d9d9d9 !important;
}
.input-border .q-field__label {
  color: black;
}
</style>
