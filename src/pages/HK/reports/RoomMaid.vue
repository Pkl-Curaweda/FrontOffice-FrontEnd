<template>
  <q-page class="flex flex-center q-px-lg q-py-xl">
    <HKCard title="Room Maid Housekeeping List" radius="25px" card_class="full-width q-px-lg">
      <!-- BTNs -->
      <div class="full-width justify-end flex q-gutter-sm">
        <HKPrintModal :columns="columns" :rows="rows" />
      </div>

      <!-- INPUTs -->
      <div class="full-width flex row-md justify-between q-mb-lg">
        <!-- 1st Column -->
        <table>
          <tr>
            <td align="right">Room</td>
            <td></td>
            <td><q-input dense outlined v-model="roomInput" /></td>
          </tr>
          <tr>
            <td align="right">To Room</td>
            <td></td>
            <td><q-input dense outlined v-model="toRoomInput" /></td>
          </tr>
        </table>

        <!-- 2nd Column -->
        <table>
          <tr>
            <td align="right">Location</td>
            <td></td>
            <td><q-input dense outlined v-model="locationInput" /></td>
          </tr>
          <tr>
            <td colspan="3">
              <q-checkbox v-model="allRoomsCheck" label="Show All Room" />
            </td>
          </tr>
        </table>

        <!-- 3rd Column -->
        <table>
          <tr>
            <td><q-checkbox v-model="oddRoomsCheck" label="Odd Rooms" /></td>
          </tr>
          <tr>
            <td><q-checkbox v-model="evenRoomsCheck" label="Even Rooms" /></td>
          </tr>
        </table>

        <!-- 4th Column -->
        <div class="column">
          <q-checkbox v-model="goToNextCheck" label="Go to next page when floor changed" />
          <q-checkbox v-model="printWithCheck" label="Print with 2 line space" />
          <q-checkbox v-model="autoRoomsCheck" label="Auto Rooms Assignment" />
        </div>
      </div>

      <!-- Table -->
      <HKTable :columns="columns" :rows="rows" />
    </HKCard>
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKPrintModal from 'src/components/HK/Modal/HKPrintModal.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'room-no',
    required: true,
    label: 'Room no',
    align: 'left',
    field: (row) => row.number,
    sortable: true
  },
  {
    name: 'room-type',
    align: 'left',
    label: 'Room Type',
    field: 'type',
    sortable: true
  },
  {
    name: 'status',
    align: 'left',
    label: 'Room Status',
    field: 'stat',
    sortable: true
  },
  {
    name: 'pax',
    label: 'Pax',
    field: 'pax',
    sortable: true,
    align: 'left'
  },
  {
    name: 'MainGuestName',
    label: 'Main Guest Name',
    field: 'mainguest',
    align: 'left'
  },
  {
    name: 'reserved-name',
    label: 'Reserved Name',
    field: 'reservedname',
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
    name: 'departure',
    label: 'Departure',
    field: 'departure',
    align: 'left'
  },
  {
    name: 'nation',
    label: 'Nation',
    field: 'nation',
    align: 'left'
  },
  {
    name: 'reservation-remark',
    label: 'Reservation Remark',
    field: 'reservation',
    align: 'left'
  }
]

const rows = [
  {
    number: '01',
    type: 'STD',
    stat: 'Expected Departure',
    pax: 'DD',
    mainguest: 'PT.Telkom',
    reservedname: 'PT.Telkom',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '02',
    type: 'DLX',
    stat: 'Occupied Dirty',
    pax: 'RR',
    mainguest: 'Agus',
    reservedname: 'Agus',
    arrival: '15/09/23',
    departure: '17/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '03',
    type: 'FML',
    stat: 'Out-of-Order',
    pax: '',
    mainguest: 'Telkom University',
    reservedname: 'Telkom University',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '04',
    type: 'FML',
    stat: 'Vacant Dirty',
    pax: 'RR',
    mainguest: 'Telkom University',
    reservedname: 'Telkom University',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '05',
    type: 'DLX',
    stat: 'Occupied Dirty',
    pax: 'DD',
    mainguest: 'Telkom University',
    reservedname: 'Telkom University',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '06',
    type: 'STD',
    stat: 'Expected Departure',
    pax: 'DD',
    mainguest: 'PT.Telkom',
    reservedname: 'PT.Telkom',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '07',
    type: 'DLX',
    stat: 'Occupied Dirty',
    pax: 'RR',
    mainguest: 'Agus',
    reservedname: 'Agus',
    arrival: '15/09/23',
    departure: '17/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '08',
    type: 'FML',
    stat: 'Out-of-Order',
    pax: '',
    mainguest: 'Telkom University',
    reservedname: 'Telkom University',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '09',
    type: 'FML',
    stat: 'Vacant Dirty',
    pax: 'RR',
    mainguest: 'Telkom University',
    reservedname: 'Telkom University',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  },
  {
    number: '10',
    type: 'DLX',
    stat: 'Occupied Dirty',
    pax: 'DD',
    mainguest: 'Telkom University',
    reservedname: 'Telkom University',
    arrival: '15/09/23',
    departure: '16/09/23',
    nation: 'IDN',
    reservation: 'Title Subtitle'
  }
]

export default defineComponent({
  name: 'RoomMaidPage',
  components: { HKCard, HKTable, HKPrintModal },
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
      evenRoomsCheck: ref(false),
      goToNextCheck: ref(false),
      printWithCheck: ref(false),
      autoRoomsCheck: ref(false)
    }
  }
})
</script>
