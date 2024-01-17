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
            <q-select
              outlined
              dense
              v-model="sortingModel"
              dropdown-icon="expand_more"
              :options="sortingOptions"
              style="width: 11rem"
              class="input-border"
            />
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
            <HKDateInput />
          </div>

          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Departure :</span>
            <HKDateInput />
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
          <HKTable :columns="tableColumns" :rows="tableRows" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKDateInput from 'src/components/HK/Form/HKDateInput.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'
import { ref } from 'vue'

const arrivalData = [
  {
    label: 'Checked In Today',
    room: 5,
    person: 10
  },
  {
    label: 'Arriving',
    room: 4,
    person: 8
  },
  {
    label: 'Total Arrival',
    room: 9,
    person: 18
  }
]

const departureData = [
  {
    label: 'Departed Today',
    room: 5,
    person: 10
  },
  {
    label: 'Departing',
    room: 4,
    person: 8
  },
  {
    label: 'Total Departure',
    room: 9,
    person: 18
  }
]

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

const tableRows = [
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  },
  {
    name: 188086,
    res_resource: 'Individual Reservation',
    rm_no: 101,
    r_type: 'DLX',
    b_type: 'K',
    guest_name: 'RONO RUSTAN',
    arr: 'RB',
    arrival: '12/02/23',
    depart: '13/02/23',
    night: 1,
    room_boy: 'ILYAS',
    room_stat: 'ED',
    created_date: '12/02/23'
  }
]

export default {
  name: 'ArrivalPage',
  components: { HKCard, HKDateInput, HKTable },
  setup() {
    return {
      arrivalData,
      departureData,
      tableColumns,
      tableRows,
      sortingModel: ref('Room Number'),
      sortingOptions: ['Room Number', 'Reservation Number', 'Room Type', 'Guest Name'],
      guestHistoryModel: ref(false),
      searchModel: ref('')
    }
  }
}
</script>

<style>
.input-border .q-field__control::before {
  border-color: #d9d9d9 !important;
}
.input-border .q-field__label {
  color: black;
}
</style>
