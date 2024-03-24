<template>
  <q-page class="flex flex-center q-py-lg q-px-lg">
    <HKCard card_style="padding: 24px; width: 100%;">
      <!-- BTNs -->
      <div class="full-width justify-end flex q-mb-sm">
        <q-btn padding="8px" flat @click="showInputTable">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="22"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M16 10.09V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.21 3.59 18 8 18C8.46 18 8.9 18 9.33 17.94C9.1129 17.3162 9.00137 16.6605 9 16V15.95C8.68 16 8.35 16 8 16C4.13 16 2 14.5 2 14V11.77C3.61 12.55 5.72 13 8 13C8.65 13 9.27 12.96 9.88 12.89C10.4127 12.0085 11.1638 11.2794 12.0607 10.7731C12.9577 10.2668 13.9701 10.0005 15 10C15.34 10 15.67 10.04 16 10.09ZM14 9.45C12.7 10.4 10.42 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.45ZM8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6ZM19 15V17H16V20H14V17H11V15H14V12H16V15H19Z"
              fill="#008444"
            />
          </svg>
        </q-btn>
        <q-btn flat @click="printOOO" color="primary">
          <q-icon size="30px" name="o_print" />
        </q-btn>
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
                @click="setFilterDisplay('createdDate', 'Created Date')"
              >
                <q-item-section>Created Date</q-item-section>
              </q-item>
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
      <div :class="`tableComp ${gapColorClass}`" class="my-table" ref="pdfContainer">
        <q-table
          :rows="tableRows"
          :columns="tableColumns"
          :pagination="pagination"
          :rows-per-page-options="[100000000000000000000000]"
          row-key="name"
          square
          :table-header-style="{
            backgroundColor: '#069550',
            color: '#ffffff',
            padding: '10px'
          }"
          hide-bottom
          :card-style="{ boxShadow: 'none' }"
          :dense="$q.screen.lt.md"
          :title="title"
        >
          <template v-slot:top-row v-if="showInput">
            <q-tr>
              <q-td>
                <q-select
                  outlined
                  v-model="roomNo"
                  :options="roomNoOptions"
                  dense
                  dropdown-icon="expand_more"
              /></q-td>
              <q-td
                ><q-input
                  outlined
                  dense
                  v-model="reasonRoom"
                  class="input-border"
                  label="Reason Room"
                  style="width: fit-content"
              /></q-td>
              <q-td
                ><q-btn-dropdown
                  flat
                  square
                  style="border: 1px #00000030 solid"
                  class="text-capitalize date-btn text-black rounded-borders"
                  :label="datePickerFrom?.replace(/\//g, '-') || 'Date'"
                  icon="o_event"
                  color="primary"
                  dropdown-icon="o_expand_more"
                >
                  <div>
                    <q-date v-model="datePickerFrom" color="green" today-btn />
                  </div> </q-btn-dropdown
              ></q-td>
              <q-td
                ><q-btn-dropdown
                  flat
                  square
                  style="border: 1px #00000030 solid"
                  class="text-capitalize date-btn text-black rounded-borders"
                  :label="datePickerUntil?.replace(/\//g, '-') || 'Date'"
                  icon="o_event"
                  color="primary"
                  dropdown-icon="o_expand_more"
                >
                  <div>
                    <q-date v-model="datePickerUntil" color="green" today-btn />
                  </div> </q-btn-dropdown
              ></q-td>
              <q-td
                ><q-input outlined dense class="input-border col-grow" v-model="CreatedBy" disable
              /></q-td>
              <q-td>
                <q-select
                  outlined
                  v-model="dept"
                  :options="deptOption"
                  dense
                  dropdown-icon="expand_more"
                />
              </q-td>
              <q-td>
                <q-btn
                  label="Add"
                  unelevated
                  color="primary"
                  dense
                  class="text-capitalize full-width"
                  @click="postDataTable"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </HKCard>
  </q-page>
</template>
<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import { defineComponent, ref } from 'vue'
import html2pdf from 'html2pdf.js'

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

export default defineComponent({
  name: 'OOOPages',
  components: { HKCard },
  setup() {
    return {
      value: ref('OOO'),
      tableColumns,
      showInput,
      tableRows: ref(),
      buttonLabel: ref('OOO'),
      filterDisplay: ref('createdDate'),
      filterDisplayLabel: ref('Created Date'),
      datePickerArrival: ref(),
      datePickerDeparture: ref(),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref(),
      datePickerFrom: ref(),
      datePickerUntil: ref(),
      formattedFromDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedUntilDate: ref(),
      roomNoOptions: ref(),
      roomNo: ref(101),
      dept: ref('Deparment'),
      reasonRoom: ref(),
      CreatedBy: ref(),
      deptOption: ref()
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping'),
      user: this.$AuthStore.getUser()
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
    datePickerFrom: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    },
    datePickerUntil: {
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
    },
    roomNo: {
      handler(newValue) {
        this.fetchData()
      }
    },
    dept: {
      handler(newValue) {
        this.fetchData()
      }
    }
  },

  methods: {
    printOOO() {
      const element = this.$refs.pdfContainer

      html2pdf(element, {
        margin: 1,
        filename: `OOO - OM ${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
    },
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
        case 'createdDate':
          this.filterDisplayLabel = 'Created Date'
          break
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
          this.filterDisplayLabel = 'Created Date'
      }
    },
    toggleTable() {
      if (this.value === 'OOO' && this.buttonLabel == 'OOO') {
        this.value = 'OM'
        this.buttonLabel = 'OM'
      } else {
        this.value = 'OOO'
        this.buttonLabel = 'OOO'
      }
      this.fetchData() // Panggil metode fetchData setelah toggle nilai
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'error unknown action try again',
          timeout: 1000
        },
        1000
      )
    },
    postDataTable() {
      const data = {
        roomId: this.roomNo?.label ? this.roomNo.label : this.roomNo,
        reason: this.reasonRoom,
        from: new Date(this.datePickerArrival),
        until: new Date(this.datePickerDeparture),
        departmentId: this.dept.value,
        description: 'Sended By Admin',
        xType: this.buttonLabel
      }

      let url = `ooo-rooms`

      this.api.post(url, data, ({ status, message }) => {
        if (status === 200) {
          this.trigger('positive', message)
          this.fetchData()
        }
      })
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
          const { OOORoom, ident, listOfRoom, listOfDepartment } = data

          this.CreatedBy = this.user.username

          const arrivalDate = data.arr // Gantilah 'arrival.arr' dengan properti yang benar
          if (this.datePickerArrival == null) {
            this.datePickerArrival = arrivalDate
          }

          const departureDate = data.dep // Gantilah 'data.dep' dengan properti yang benar
          if (this.datePickerDeparture == null) {
            this.datePickerDeparture = departureDate
          }

          const fromDate = this.datePickerFrom // Gantilah 'arrival.arr' dengan properti yang benar
          if (this.datePickerFrom == null) {
            this.datePickerFrom = fromDate
          }

          const untilDate = this.datePickerUntil // Gantilah 'arrival.arr' dengan properti yang benar
          if (this.datePickerUntil == null) {
            this.datePickerUntil = untilDate
          }

          this.roomNoOptions = listOfRoom.map((lof) => ({
            label: lof.id
          }))

          this.deptOption = listOfDepartment.map((lod) => ({
            label: lod.label,
            value: lod.id
          }))
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
            room_type: ooo.roomType.longDesc
          }))
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
