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
          <HKChart :series="barS" :options="barO" />
        </div>
        <div class="relative-position" style="height: 250px">
          <HKChart :series="pieS" :options="pieO" />
          <img
            src="../../assets/svg/user_group.svg"
            alt=""
            class="absolute-center"
            style="translate: 2px -10px"
          />
        </div>
      </q-card-section>
    </HKCard>
    <div class="row justify-between q-mt-md">
      <HKTable
        :rows="roomTypeVal"
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
import HKChart from 'src/components/charts/HKChart.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'

const roomData = [
  {
    id: 1,
    name: 'Occupied Room',
    room: '01',
    person: '02'
  },
  {
    id: 2,
    name: 'Complimentary Room',
    room: '01',
    person: '02'
  },
  {
    id: 3,
    name: 'House Use Room',
    room: '01',
    person: '02'
  },
  {
    id: 4,
    name: 'Out-Of-Order Room',
    room: '01',
    person: '02'
  },
  {
    id: 5,
    name: 'Off Market',
    room: '01',
    person: '02'
  },
  {
    id: 6,
    name: 'Estimated Occupied',
    room: '01',
    person: '02'
  }
]

const responsiveChart = [
  {
    breakpoint: 1180,
    options: {
      legend: {
        position: 'bottom',
        offsetY: 0,
        fontSize: '16px',
        fontWeight: 400,
        markers: {
          width: '20px',
          height: '20px',
          offsetX: -5
        },
        itemMargin: {
          horizontal: 10
        }
      }
    }
  }
]

const handleChart = {
  barSeries: [
    {
      name: 'Est Occupancy',
      data: [5, 0, 4, 13, 4, 14]
    },
    {
      name: 'Occupancy',
      data: [10, 0, 5, 0, 0, 19]
    }
  ],
  pieSeries: [85, 15],
  barOpt: {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '15px',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 8,
      colors: ['transparent']
    },
    grid: {
      yaxis: {
        lines: {
          show: true
        }
      },
      borderColor: '#A4A4A4',
      strokeDashArray: 7
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisBorder: {
        show: true,
        color: '#000000',
        offsetX: 0,
        offsetY: 0
      }
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: '#000000',
        offsetX: 0,
        offsetY: 0
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return +val + '%'
        }
      }
    },
    colors: ['#A468D3', '#77CE7F'],
    responsive: responsiveChart
  },
  pieOpt: {
    chart: {
      type: 'donut'
    },
    stroke: {
      width: 0,
      colors: 'transparent'
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#A468D3', '#77CE7F'],
    legend: {
      show: false
    },
    responsive: responsiveChart
  }
}

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

const tableRow = {
  standard: [
    {
      name: '101',
      r_type: 'Standard',
      status: 'Occupied Room'
    },
    {
      name: '103',
      r_type: 'Standard',
      status: 'Family Room'
    },
    {
      name: '104',
      r_type: 'Standard',
      status: 'Occupied Room'
    },
    {
      name: '105',
      r_type: 'Standard',
      status: 'Occupied Room'
    },
    {
      name: '106',
      r_type: 'Standard',
      status: 'Occupied Room'
    }
  ],
  deluxe: [
    {
      name: '102',
      r_type: 'Deluxe',
      status: 'Complimentary Room'
    },
    {
      name: '103',
      r_type: 'Deluxe',
      status: 'Family Room'
    },
    {
      name: '104',
      r_type: 'Deluxe',
      status: 'Occupied Room'
    },
    {
      name: '105',
      r_type: 'Deluxe',
      status: 'Occupied Room'
    },
    {
      name: '106',
      r_type: 'Deluxe',
      status: 'Occupied Room'
    }
  ]
}

const radio_opt = [
  { label: 'Standard Room', value: 'standard' },
  { label: 'Deluxe Room', value: 'delux' },
  { label: 'Family Room', value: 'family' }
]

const selectOption = ['Show by Week', 'Show by Month', 'Show by Year']

export default defineComponent({
  name: 'RoomOccupancyPage',
  components: { HKCard, HKChart, HKTable },
  setup() {
    return {
      r_group: ref(null),
      model: ref(null),
      options: selectOption,
      roomData,
      radio_opt
    }
  },
  data() {
    const barS = handleChart.barSeries
    const pieS = handleChart.pieSeries
    const barO = handleChart.barOpt
    const pieO = handleChart.pieOpt

    let roomTypeVal = tableRow.standard
    let roomVal
    return {
      barS,
      pieS,
      barO,
      pieO,
      tableCol,
      roomTypeVal
    }
    return {
      api: new this.$Api('housekeeping')
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {},
  methods: {
    fetchData() {}
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
