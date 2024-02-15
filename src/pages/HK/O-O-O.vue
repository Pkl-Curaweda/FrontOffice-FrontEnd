<template>
  <q-page class="flex flex-center q-py-lg q-px-lg">
    <HKCard card_style="padding: 24px; width: 100%;">
      <!-- BTNs -->
      <div class="full-width justify-end flex q-mb-sm">
        <q-btn padding="8px" flat @click="showInputTable">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 30 36"
            fill="none"
          >
            <path
              d="M14.3158 23.9474C15.7474 23.9474 17.1253 23.8184 18.4495 23.6158L23.6568 18.2553C21.2768 19.5079 17.8947 20.2632 14.3158 20.2632C9.98526 20.2632 5.90526 19.1579 3.57895 17.4079V12.2316C6.20947 13.7605 10.0389 14.7368 14.3158 14.7368C18.5926 14.7368 22.4221 13.7605 25.0526 12.2316V16.8184L27.54 14.2579C27.8621 13.9263 28.2379 13.6684 28.6316 13.4474V7.36842C28.6316 3.29737 22.2253 0 14.3158 0C6.40632 0 0 3.29737 0 7.36842V25.7895C0 29.5474 5.47579 32.6421 12.5263 33.1026V29.7132L12.8305 29.4C6.87158 29.0316 3.57895 26.6368 3.57895 25.7895V21.6816C6.46 23.1184 10.2358 23.9474 14.3158 23.9474ZM14.3158 3.68421C21.2411 3.68421 25.0526 6.44737 25.0526 7.36842C25.0526 8.28947 21.2411 11.0526 14.3158 11.0526C7.39053 11.0526 3.57895 8.28947 3.57895 7.36842C3.57895 6.44737 7.39053 3.68421 14.3158 3.68421ZM27.0747 19.95L30.7253 23.7079L19.7558 35H16.1053V31.2421L27.0747 19.95ZM33.7316 20.6132L31.9779 22.4184L28.3274 18.6605L30.0811 16.8553C30.4211 16.4868 31.0116 16.4868 31.3695 16.8553L33.7316 19.2868C34.0895 19.6553 34.0895 20.2632 33.7316 20.6132Z"
              fill="#008444"
            />
          </svg>
        </q-btn>
        <HKPrintModal :columns="tableColumns" :rows="tableRows" />
      </div>

      <!-- Filtering -->
      <div class="flex justify-between q-mb-sm" style="gap: 8px">
        <div class="flex items-center" style="column-gap: 8px">
          <span style="font-size: 14px; font-weight: 500">Sorting :</span>
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
                @click="setFilterDisplay('roomNumber', 'Room Number')"
              >
                <q-item-section>Room Number</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="setFilterDisplay('department', 'Department')">
                <q-item-section>Department</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="setFilterDisplay('reason', 'Reason')">
                <q-item-section>Reason</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="setFilterDisplay('pic', 'Guest Name')">
                <q-item-section>Guest Name</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn
            color="primary"
            text-color="white"
            v-model="value"
            :label="buttonLabel"
            @click="toggleTable"
          />
        </div>

        <div class="flex" style="gap: 8px 16px">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 14px; font-weight: 500">From :</span>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize date-btn text-black rounded-borders"
              :label="datePickerArrival?.replace(/\//g, '-') || 'Date'"
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
            <span style="font-size: 14px; font-weight: 500">To :</span>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize date-btn text-black rounded-borders"
              :label="datePickerDeparture?.replace(/\//g, '-') || 'Date'"
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

      <!-- Table -->
      <HKTable
        :columns="tableColumns"
        :rows="tableRows"
        :showInput="showInput"
        :currentType="this.buttonLabel"
      />
    </HKCard>
  </q-page>
</template>
<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'
import HKPrintModal from 'src/components/HK/Modal/HKPrintModal.vue'
import { defineComponent, ref } from 'vue'

const showInput = ref(false)
const tableColumns = [
  {
    name: 'room-no',
    label: 'Room No.',
    field: (row) => row.name,
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'reason_room',
    label: 'Reason Room 0-0-0',
    field: 'reason_room',
    align: 'left',
    sortable: true
  },
  {
    name: 'from',
    label: '0-0-0 From',
    field: 'from',
    align: 'left',
    sortable: true
  },
  {
    name: 'until',
    label: '0-0-0 Until',
    field: 'until',
    align: 'left',
    sortable: true
  },
  {
    name: 'created_by',
    label: 'Created By',
    field: 'created_by',
    align: 'left',
    sortable: true
  },
  {
    name: 'dept',
    label: 'Dept',
    field: 'dept',
    sortable: true,
    align: 'left'
  },
  {
    name: 'room_type',
    label: 'Room Type',
    field: 'room_type',
    sortable: true,
    align: 'left'
  }
]
const tableRows = []

export default defineComponent({
  name: 'OOOPages',
  components: { HKCard, HKTable, HKPrintModal },
  setup() {
    return {
      value: ref('OM'),
      tableColumns,
      showInput,
      tableRows: ref(),
      buttonLabel: ref('OM'),
      filterDisplay: ref('roomNumber'),
      filterDisplayLabel: ref('Room Number'),
      datePickerArrival: ref(),
      datePickerDeparture: ref(),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref()
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping')
      // pagination: {
      //   page: 1,
      //   rowsNumber: 0,
      //   rowsPerPage: 20
      // }
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
    value: {
      deep: true,
      handler(newVal) {
        this.fetchData()
      }
    }
  },
  methods: {
    showInputTable() {
      if (this.showInput == false) {
        this.showInput = true
      } else {
        this.showInput = false
      }
    },
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.updateFilterDisplayLabel(option)
      this.fetchData()
    },
    updateFilterDisplayLabel(option) {
      // Logic to update the label based on the selected option
      switch (option) {
        case 'roomNumber':
          this.filterDisplayLabel = 'Room Number'
          break
        case 'department':
          this.filterDisplayLabel = 'Department'
          break
        case 'reason':
          this.filterDisplayLabel = 'Reason'
          break
        case 'pic':
          this.filterDisplayLabel = 'Guest Name'
          break
        // Add other cases as needed
        default:
          this.filterDisplayLabel = 'Default Label'
      }
    },
    toggleTable() {
      if (this.value === 'OM' && this.buttonLabel == 'OM') {
        this.value = 'OOO'
        this.buttonLabel = 'OOO'
      } else {
        this.value = 'OM'
        this.buttonLabel = 'OM'
      }
      this.fetchData() // Panggil metode fetchData setelah toggle nilai
    },
    fetchData() {
      this.loading = true
      let url = `ooo-rooms?`

      const DateArrival = this.datePickerArrival?.replace(/\//g, '-')
      if (DateArrival !== undefined && DateArrival !== '') {
        url += `&arr=${DateArrival}`
      }

      const DateDeparture = this.datePickerDeparture?.replace(/\//g, '-')
      if (DateDeparture !== undefined && DateDeparture !== '') {
        url += `&dep=${DateDeparture}` // Ganti 'arrival' dengan 'departure'
      }

      if (this.filterDisplay !== null) {
        url += `&sortOrder=${this.filterDisplay}`
      }

      if (this.value !== null) {
        url += `&type=${this.value}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          const { OOORoom, ident } = data

          const arrivalDate = data.arr // Gantilah 'arrival.arr' dengan properti yang benar
          if (this.datePickerArrival == null) {
            this.datePickerArrival = arrivalDate
          }

          const departureDate = data.dep // Gantilah 'data.dep' dengan properti yang benar
          if (this.datePickerDeparture == null) {
            this.datePickerDeparture = departureDate
          }

          this.tableColumns = [
            {
              name: 'room-no',
              label: 'Room No.',
              field: (row) => row.name,
              align: 'left',
              required: true,
              sortable: true
            },
            {
              name: 'reason_room',
              label: `Reason Room ${ident}`,
              field: 'reason_room',
              align: 'left',
              sortable: true
            },
            {
              name: 'from',
              label: `${ident} From`,
              field: 'from',
              align: 'left',
              sortable: true
            },
            {
              name: 'until',
              label: `${ident} Until`,
              field: 'until',
              align: 'left',
              sortable: true
            },
            {
              name: 'created_by',
              label: 'Created By',
              field: 'created_by',
              align: 'left',
              sortable: true
            },
            {
              name: 'dept',
              label: 'Dept',
              field: 'dept',
              sortable: true,
              align: 'left'
            },
            {
              name: 'room_type',
              label: 'Room Type',
              field: 'room_type',
              sortable: true,
              align: 'left'
            }
          ]
          this.tableRows = OOORoom.map((ooo) => ({
            name: ooo.roomNo,
            reason_room: ooo.reason,
            from: ooo.from,
            until: ooo.until,
            created_by: ooo.pic,
            dept: ooo.department,
            room_type: ooo.roomType
          }))
          console.log(this.tableRows)
        }
      })
    }
  }
})
</script>

<style scoped>
.input-border .q-field__control::before {
  border-color: #d9d9d9 !important;
}
.input-border .q-field__label {
  color: black;
}
</style>
