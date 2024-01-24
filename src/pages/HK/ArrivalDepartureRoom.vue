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
      <div class="flex q-mb-sm justify-between" style="gap: 8px">
        <div class="flex" style="gap: 16px">
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
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('room+id+asc', 'Room Number')"
                >
                  <q-item-section>Room Number</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('room+type+DELUXE', 'Room Type Deluxe')"
                >
                  <q-item-section>Room Type Deluxe</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('room+type+FAMILY', 'Room Type Family')"
                >
                  <q-item-section>Room Type Family</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('room+type+STANDARD', 'Room Type Standard')"
                >
                  <q-item-section>Room Type Standard</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('rese+name+asc', 'Guest Name')"
                >
                  <q-item-section>Guest Name</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('resv+id+asc', 'Reservation Number')"
                >
                  <q-item-section>Reservation Number</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <q-btn
            outline
            dense
            @click="guestHistoryModel = true"
            style="width: 12rem; color: #d9d9d9; padding-inline: 16px"
            align="left"
            no-caps
          >
            <q-icon name="history" style="color: #616161; margin-right: 8px" />
            <div style="color: #616161">Guest History</div>
          </q-btn>
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
          </div>
        </div>
      </div>

      <HKTable :columns="tableColumns" :rows="tableRows" />
    </div>

    <!-- Guest History Dialog -->
    <q-dialog v-model="guestHistoryModel">
      <q-card style="width: 100vw; max-width: 100vw; padding-block: 24px">
        <q-card-section class="flex justify-center text-h5">Guest List History</q-card-section>
        <q-card-section>
          <div class="flex justify-end q-mb-sm">
            <q-input
              outlined
              dense
              v-model="searchModel"
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
            :columns="tableColumns"
            :rows="tableRows"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKDateInput from 'src/components/HK/Form/HKDateInput.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'
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

const departureData = []

const tableRows = []

export default defineComponent({
  name: 'ArrivalPage',
  components: { HKCard, HKTable },
  setup() {
    return {
      arrivalData: ref(),
      departureData: ref(),
      loading: ref(false),
      tableColumns,
      filterDisplay: ref('room+id+asc'),
      filterDisplayLabel: ref('Room Number'),
      inputtedDate: ref(),
      formattedDate: ref(),
      datePickerArrival: ref(),
      datePickerDeparture: ref(),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref(''),
      tableRows: ref(),
      guestHistoryModel: ref(false),
      searchModel: ref('')
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
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.updateFilterDisplayLabel(option)
      this.fetchData()
    },
    updateFilterDisplayLabel(option) {
      // Logic to update the label based on the selected option
      switch (option) {
        case 'room+id+asc':
          this.filterDisplayLabel = 'Room Number'
          break
        case 'room+type+DELUXE':
          this.filterDisplayLabel = 'Room Type Deluxe'
          break
        case 'room+type+FAMILY':
          this.filterDisplayLabel = 'Room Type Family'
          break
        case 'room+type+STANDARD':
          this.filterDisplayLabel = 'Room Type Standard'
          break
        case 'rese+name+asc':
          this.filterDisplayLabel = 'Guest Name'
          break
        case 'resv+id+asc':
          this.filterDisplayLabel = 'Reservation Number'
          break
        // Add other cases as needed
        default:
          this.filterDisplayLabel = 'Default Label'
      }
    },
    fetchData() {
      this.loading = true

      let url = `arrival-departure?`

      const DateArrival = this.datePickerArrival?.replace(/\//g, '-')
      if (DateArrival !== undefined && DateArrival !== '') {
        url += `&arrival=${DateArrival}`
      }

      const DateDeparture = this.datePickerDeparture?.replace(/\//g, '-')
      if (DateDeparture !== undefined && DateDeparture !== '') {
        url += `&depart=${DateDeparture}` // Ganti 'arrival' dengan 'departure'
      }

      // if (this.filterDisplay !== null) {
      //   url += `&sortOrder=${this.filterDisplay}`
      // }
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
            name: row.resNo,
            res_resource: row.resResource,
            rm_no: row.roomNo.id,
            r_type: row.roomType,
            b_type: row.bedType,
            guest_name: row.guestName,
            arr: row.arrangment.split('-')[1],
            arrival: row.arrival,
            depart: row.departure,
            night: row.night,
            room_boy: row.roomBoy.user.name,
            room_stat: row.roomStatus.shortDescription,
            created_date: row.created
          }))
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
