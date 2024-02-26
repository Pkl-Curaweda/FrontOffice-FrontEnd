<template>
  <q-layout view="lHh LpR fFf">
    <q-header bordered class="bg-grey text-white">
      <q-toolbar class="items-center">
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->
        <q-toolbar-title> Lingian Hotel Management System </q-toolbar-title>

        <div class="q-gutter-sm row items-center no-wrap">
          <MessengerFloat />
          <ProfileFloat />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <SideBar />
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md" style="overflow-y: hidden">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="q-ma-none text-bold">{{ currentClock }}</h4>
            <h6 class="q-ma-none text-bold">{{ currentDate }}</h6>
          </div>
          <q-btn icon="o_add" color="primary" label="Create new reservation" to="/fo/guest-list" />
        </div>

        <div class="row no-wrap q-my-lg" style="gap: 16px">
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_calendar_today" />
            </div>
            <div>
              <p class="label">New Reservations</p>
              <h5 class="data">{{ newReservation || '000' }}</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_bed" />
            </div>
            <div>
              <p class="label">Available Rooms</p>
              <h5 class="data">{{ availableRooms || '000' }}</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_login" />
            </div>
            <div>
              <p class="label">Check In</p>
              <h5 class="data">{{ checkIn || '000' }}</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_logout" />
            </div>
            <div>
              <p class="label">Check Out</p>
              <h5 class="data">{{ checkOut || '000' }}</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_query_stats" />
            </div>
            <div>
              <p class="label">Occupancy Rate</p>
              <h5 class="data">{{ occupancyRate || '0%' }}</h5>
            </div>
          </div>
        </div>

        <div class="row q-gutter-md no-wrap col-grow">
          <div class="q-pa-md bg-white rounded shadow-3">
            <h5 class="text-bold q-ma-none">Recent Reservation Schedule</h5>
            <q-date
              v-model="recentReservationDate"
              class="no-shadow q-pa-none full-width"
              style="max-width: 520px"
              minimal
            />
            <div class="my-table">
              <q-table
                style="max-width: 520px"
                class="no-shadow"
                v-model:pagination="pagination"
                @request="onPaginationChange"
                :rows-per-page-options="[1, 5, 7, 10, 15, 20, 25, 30]"
                :rows="data"
                :loading="loading"
                :columns="columns"
                row-key="name"
              >
                <template>
                  <q-tr class="table-head">
                    <q-th style="padding-top: 0px; padding-bottom: 0px">
                      <template v-slot:header="props">
                        <q-tr class="table-head" :props="props">
                          <q-th
                            v-for="(col, i) in props.cols"
                            :key="i"
                            style="padding-top: 0px; padding-bottom: 0px"
                          >
                          </q-th>
                        </q-tr>
                      </template>
                    </q-th>
                  </q-tr>
                </template>
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <template v-for="(cell, key, i) in props.row" :key="i">
                      <q-td :style="cell.style">
                        {{ cell.data }}
                      </q-td>
                    </template>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
          <div class="col-grow">
            <div class="q-pa-md q-mb-md bg-white rounded shadow-3">
              <q-carousel
                v-model="slide"
                swipeable
                animated
                control-color="grey"
                arrows
                style="height: 100%"
              >
                <q-carousel-slide name="style">
                  <h5 class="text-bold q-ma-none">Reservation Statistics</h5>
                  <div class="q-mt-md">
                    <apexchart
                      style="padding: 0 20px"
                      type="bar"
                      :options="reservationChartOption"
                      :series="reservationSeries"
                    ></apexchart>
                  </div>
                </q-carousel-slide>
                <q-carousel-slide name="tv" class="col-grow">
                  <h5 class="text-bold q-ma-none">Daily Room Usage</h5>
                  <div class="q-mt-md">
                    <UsageChart />
                    <div class="row justify-center" style="gap: 8px">
                      <q-list class="row" style="gap: 5px">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#feeb74"
                          viewBox="0 0 256 256"
                        >
                          <path
                            d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"
                          ></path>
                        </svg>
                        <p class="text-xs q-my-auto">Low</p>
                      </q-list>
                      <q-list class="row" style="gap: 5px">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#77ce7f"
                          viewBox="0 0 256 256"
                        >
                          <path
                            d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"
                          ></path>
                        </svg>
                        <p class="text-xs q-my-auto">Medium</p>
                      </q-list>
                      <q-list class="row" style="gap: 5px">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#0194f3"
                          viewBox="0 0 256 256"
                        >
                          <path
                            d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"
                          ></path>
                        </svg>
                        <p class="text-xs q-my-auto">High</p>
                      </q-list>
                    </div>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
            <div class="q-pa-md bg-white rounded shadow-3 col-grow">
              <h5 class="text-bold q-ma-none">Housekeeping</h5>
              <div class="q-mt-md">
                <apexchart
                  type="bar"
                  height="200"
                  ref="barChart"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import SideBar from 'src/components/SideBar.vue'
import ProfileFloat from 'src/components/ProfileFloat.vue'
import { formatDate } from 'src/utils/time'
import { ref, defineAsyncComponent } from 'vue'
import MessengerFloat from 'src/components/MessengerFloat.vue'
import { getCurrentTime } from 'src/utils/time'
// import frontoffice_routes from 'src/router/frontoffice.router'

const UsageChart = defineAsyncComponent(() => import('components/charts/UsageChart.vue'))

// const BarChart = defineAsyncComponent(() => import('components/charts/BarChart.vue'))
const chartOptions = {
  chart: {
    type: 'bar',
    height: 430
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    categories: [
      'Vacant Clean',
      'Vacant Clean Unchecked',
      'Vacant Dirty',
      'Occupied Clean',
      'Occupied Dirty'
    ]
  }
}
export default {
  setup() {
    const slide = ref('style')
    const leftDrawerOpen = ref(false),
      currentClock = '-',
      currentDate = '-'

    const series = ref([
      {
        data: []
      }
    ])
    // const shouldShowSidebar = !frontoffice_routes.path.startsWith('/fo/super-admin')

    return {
      newReservation: ref(''),
      recentReservationDate: ref(''),
      availableRooms: ref(''),
      checkIn: ref(''),
      checkOut: ref(''),
      occupancyRate: ref(''),
      leftDrawerOpen,
      currentClock,
      series,
      chartOptions,
      currentDate,
      columns: [
        { name: 'ResNo', label: 'ResNo', align: 'left', field: 'ResNo' },
        { name: 'GuestName', label: 'GuestName', align: 'left', field: 'GuestName' },
        { name: 'RmNo', label: 'RmNo', align: 'left', field: 'RmNo' },
        { name: 'ResResource', label: 'Reserve Resource', align: 'left', field: 'ResResource' },
        { name: 'CreatedDate', label: 'Created Date', align: 'left', field: 'CreatedDate' }
      ],
      slide,
      reservationChartOption: ref({
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
            columnWidth: '55%',
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
          categories: []
        },
        fill: {
          colors: ['#0194F3', '#77CE7F', '#FEEB74']
        },
        legend: {
          markers: {
            fillColors: ['#0194F3', '#77CE7F', '#FEEB74']
          }
        }
      }),
      reservationSeriesEntry: [],
      seriesData: ref([])
    }
  },
  data() {
    return {
      api: new this.$Api('root'),
      data: [],
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      reservationSeries: this.reservationSeriesEntry
    }
  },
  watch: {
    recentReservationDate: {
      deep: true,
      handler(newDate) {
        this.getValueDashboard()
      }
    }
  },
  mounted() {
    this.getValueDashboard()
    this.getStatistic()
  },
  components: { SideBar, ProfileFloat, MessengerFloat, UsageChart },
  created() {
    this.updateTime()

    setInterval(() => {
      this.updateTime()
    }, 60000)
  },
  methods: {
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.getValueDashboard()
    },
    toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value
    },
    updateTime() {
      let dateTimeParts = getCurrentTime().split(' ')
      this.currentDate = dateTimeParts.slice(0, 4).join(' ')
      this.currentClock = dateTimeParts[4]
    },
    getValueDashboard() {
      this.loading = true

      let url = `dashboard?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`

      const Date = this.recentReservationDate?.replace(/\//g, '-')

      if (Date !== undefined && Date !== '') {
        url += `&date=${Date}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.resv.reservation)
          const { currData, resvChart } = data
          const listOfReservationCategory = []
          Object.values(resvChart).forEach((chart) => {
            listOfReservationCategory.push(chart.ident)
          })
          this.newReservation = String(currData.newReservation).padStart(3, '0')
          this.availableRooms = String(currData.availableRoom).padStart(3, '0')
          this.checkIn = String(currData.checkIn).padStart(3, '0')
          this.checkOut = String(currData.checkOut).padStart(3, '0')
          this.occupancyRate = `${currData.occRate}%`
        }
      })
    },
    formatData(raw = []) {
      const list = []

      raw.forEach((res) => {
        list.push({
          ResNo: { data: res.reservationId, style: {} },
          GuestName: { data: res.reservation.reserver.guest.name, style: {} },
          RmNo: { data: res.roomId, style: {} },
          ResResource: { data: res.reservation.reserver.resourceName, style: {} },
          CreatedDate: { data: formatDate(res.created_at), style: {} }
        })
      })

      this.data = list
    },
    getStatistic() {
      this.api.get(`dashboard`, ({ data, status, message }) => {
        if (status == 200) {
          const { hk } = data
          const Data = [
            {
              data: [hk.vc, hk.vcu, hk.vd, hk.oc, hk.od]
            }
          ]
          this.series = [
            {
              data: [hk.vc, hk.vcu, hk.vd, hk.oc, hk.od]
            }
          ]
          console.log(this.series)
          this.$refs.barChart.updateSeries(this.series)
        }
      })
    }
  }
}
</script>

<style>
.q-date__view.q-date__calendar {
  padding-right: 0;
  padding-left: 0;
}
</style>
