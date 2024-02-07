<template>
  <q-page class="r-occupancy q-px-md q-py-xl">
    <div class="row item-center justify-evenly q-px-xs">
      <q-card
        :class="` ${$q.screen.lt.md ? 'q-mt-md' : ''} card-bg `"
        style="width: 147px"
        v-for="data in roomData"
        :key="data.id"
      >
        <div class="text-caption text-weight-bold text-center q-py-xs">{{ data.name }}</div>
        <q-card-section
          horizontal
          class="text-caption"
          style="border-top: 1.5px solid black; border-bottom: 1.5px solid black"
        >
          <div class="text-center text-caption" style="width: 50%; border-right: 1.5px solid black">
            Room
          </div>
          <div class="text-center text-caption" style="width: 50%">Person</div>
        </q-card-section>

        <q-card-section horizontal class="text-caption">
          <div
            class="text-center text-h4 q-pa-xs text-weight-bolder"
            style="width: 50%; border-right: 1.5px solid black"
          >
            {{ data.person }}
          </div>
          <div class="text-center text-h4 q-pa-xs text-weight-bolder" style="width: 50%">
            {{ data.person }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <HKCard radius="20px" card_class="card-shadow q-mt-md">
      <q-card-section
        :class="` ${$q.screen.lt.md ? 'column q-gutter-md' : 'row items-center'} justify-between`"
      >
        <div class="text-h5 text-weight-bold" style="width: 50%">Percentage</div>
        <div
          :style="` ${$q.screen.lt.md ? ' width: 100%;' : 'width: 50%'}`"
          class="row justify-end"
        >
          <q-select
            outlined
            dense
            dropdown-icon="expand_more"
            v-model="model"
            color="dark"
            :options="options"
            label="Show by"
            :style="`${$q.screen.lt.md ? ' width: 100%;' : 'width: 162px'}`"
          />
        </div>
      </q-card-section>
      <q-card-section
        :class="` ${$q.screen.lt.md ? 'column q-gutter-lg' : 'row items-center'} justify-between`"
      >
        <div :class="` ${$q.screen.lt.md ? 'col-12' : 'col-7'} `" style="height: 300px">
          <!-- bar chart -->
          <apexchart
            style="padding: 0 20px"
            type="bar"
            :options="chartOptionsBar"
            :series="seriesBar"
          />
        </div>
        <div style="height: 300px">
          <!-- pie chart -->
          <apexchart
            style="padding: 0 20px"
            type="donut"
            :options="chartOptionsDonut"
            :series="seriesDonut"
          />
        </div>
      </q-card-section>
    </HKCard>
    <div class="row justify-between q-mt-md">
      <HKTable
        :rows="tableRow"
        :columns="tableCol"
        :class="`${$q.screen.lt.md ? 'col-12' : 'col-8 '}`"
      />
      <HKCard radius="20px" card_class="card-shadow q-mt-md radio-card">
        <q-card-section>
          <q-form>
            <div class="text-weight-bold text-h5">Room Type</div>
            <q-option-group
              :options="radio_opt"
              type="radio"
              v-model="r_group"
              color="dark"
              @input="changeRoom"
            />
          </q-form>
        </q-card-section>
      </HKCard>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'

// const responsiveChart = [
//   {
//     breakpoint: 1180,
//     options: {
//       legend: {
//         position: 'bottom',
//         offsetY: 0,
//         fontSize: '16px',
//         fontWeight: 400,
//         markers: {
//           width: '20px',
//           height: '20px',
//           offsetX: -5
//         },
//         itemMargin: {
//           horizontal: 10
//         }
//       }
//     }
//   }
// ]

const seriesBar = [
  { name: 'Room', data: [1, 2, 3, 4, 5, 6, 8] },
  { name: 'Person', data: [1, 2, 3, 4, 5, 6, 8] }
]

const chartOptionsBar = ref({
  chart: {
    type: 'bar'
  },
  responsive: [
    {
      breakpoint: 80
    }
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '25%',
      endingShape: 'rounded'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Oc.Room', 'Com.Room', 'HU.Room', 'Est. Oc.Room', 'OOO.Room', 'Off Market Room']
  },
  fill: {
    colors: ['#A468D3', '#77CE7F']
  },
  legend: {
    markers: {
      fillColors: ['#A468D3', '#77CE7F']
    }
  }
})

const seriesDonut = [1, 2]
const chartOptionsDonut = {
  chart: {
    type: 'donut',
    height: 400,
    width: 400
  },
  responsive: [
    {
      breakpoint: 480
    }
  ],
  dataLabels: {
    enabled: false
  },
  fill: {
    colors: [
      '#77CE7F',
      '#00FFE0',
      '#2B8DFF',
      '#688CD3',
      '#A468D3',
      '#FFE500',
      '#FFA800',
      '#FE0001',
      '#B9B9B9',
      '#000000'
    ]
  },
  labels: [
    '101 - DLX - K',
    '102 - DLX - K',
    '103 - DLX - K',
    '104 - DLX - K',
    '105 - FML - T',
    '106 - FML - T',
    '107 - FML - T',
    '108 - STD - S',
    '109 - STD - S',
    '110 - STD - S'
  ],
  legend: {
    position: 'left',
    show: false,
    markers: {
      fillColors: [
        '#77CE7F',
        '#00FFE0',
        '#2B8DFF',
        '#688CD3',
        '#A468D3',
        '#FFE500',
        '#FFA800',
        '#FE0001',
        '#B9B9B9',
        '#000000'
      ]
    }
  }
}

const roomData = ref()

const tableCol = [
  {
    name: 'r_no',
    required: true,
    label: 'Room No',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true
  },
  { name: 'r_type', align: 'center', label: 'Room Type', field: 'r_type', sortable: true },
  { name: 'status', label: 'status', field: 'status', sortable: true }
]

const tableRow = ref([])

const radio_opt = [
  { label: 'Standard Room', value: 'STANDARD' },
  { label: 'Deluxe Room', value: 'DELUXE' },
  { label: 'Family Room', value: 'FAMILY' }
]

const selectOption = ['Show by Week', 'Show by Month', 'Show by Year']

export default defineComponent({
  name: 'RoomOccupancyPage',
  components: { HKCard, HKTable },
  setup() {
    return {
      r_group: ref('STANDARD'),
      model: ref(null),
      options: selectOption,
      roomData,
      tableCol,
      tableRow,
      radio_opt,
      seriesBar,
      chartOptionsBar,
      seriesDonut,
      chartOptionsDonut
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
    r_group: {
      handler(option) {
        this.fetchData()
      }
    }
  },
  methods: {
    fetchData() {
      this.loading = true

      let url = `roomocc?`

      if (this.r_group !== null) url += `filt=${this.r_group}`

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.loading = false
          const { currData, roomStatus } = data

          // const room = percData.roomPerc
          // const person = percData.personPerc

          // this.seriesBar = [
          //   { name: 'Room', data: room },
          //   { name: 'Person', data: person }
          // ]

          console.log(this.seriesBar)

          this.roomData = [
            {
              id: 1,
              name: 'Occupied Room',
              room: currData.occ.room || 0,
              person: currData.occ.person || 0
            },
            {
              id: 2,
              name: 'Complimentary Room',
              room: currData.comp.room || 0,
              person: currData.comp.person || 0
            },
            {
              id: 3,
              name: 'House Use Room',
              room: currData.houseUse.room || 0,
              person: currData.houseUse.person || 0
            },
            {
              id: 4,
              name: 'Out-Of-Order Room',
              room: currData.ooo.room || 0,
              person: currData.ooo.person || 0
            },
            {
              id: 5,
              name: 'Off Market',
              room: currData.om.room || 0,
              person: currData.om.person || 0
            },
            {
              id: 6,
              name: 'Estimated Occupied',
              room: currData.estOcc.room || 0,
              person: currData.estOcc.person || 0
            }
          ]

          this.tableRow = roomStatus.map((rs) => ({
            name: rs.id,
            r_type: rs.roomType,
            status: rs.roomStatus.longDescription
          }))
        }
      })
    }
  }
})
</script>

<style>
.r-occupancy .card-bg {
  background-color: #ecf8e7;
  border-radius: 15px;
}
.r-occupancy .card-shadow {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid black;
}

.r-occupancy .radio-card {
  padding: 10px 50px 30px 5px;
  height: fit-content !important;
}
</style>
