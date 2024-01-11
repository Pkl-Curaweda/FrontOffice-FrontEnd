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
      <q-page class="q-pa-md" style="overflow-y: hidden; min-width: max-content">
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

        <div class="flex q-gutter-md no-wrap">
          <div class="col-grow q-pa-md bg-white rounded shadow-3" style="max-width: 460px">
            <h5 class="text-bold q-ma-none">Recent Reservation Schedule</h5>
            <q-date
              v-model="recentReservationDate"
              class="no-shadow q-pa-none"
              style="width: 100%"
              minimal
            />
            <div class="my-table">
              <q-table
                class="no-shadow"
                v-model:pagination="pagination"
                @request="onPaginationChange"
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
              <h5 class="text-bold q-ma-none">Reservation Statistics</h5>
            </div>
            <div class="q-pa-md bg-white rounded shadow-3">
              <h5 class="text-bold q-ma-none">Housekeeping</h5>
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
import { defineComponent, ref } from 'vue'
import MessengerFloat from 'src/components/MessengerFloat.vue'
import { getCurrentTime } from 'src/utils/time'

export default defineComponent({
  components: { SideBar, ProfileFloat, MessengerFloat },

  setup() {
    const leftDrawerOpen = ref(false),
      currentClock = '-',
      currentDate = '-'

    const recentReservationDate = ref('')

    return {
      newReservation: ref(''),
      availableRooms: ref(''),
      checkIn: ref(''),
      checkOut: ref(''),
      occupancyRate: ref(''),
      leftDrawerOpen,
      currentClock,
      currentDate,
      recentReservationDate,
      columns: [
        { name: 'ResNo', label: 'ResNo', field: 'ResNo', align: 'center' },
        { name: 'GuestName', label: 'Guest Name', field: 'GuestName', align: 'center' },
        { name: 'RmNo', label: 'RmNo', field: 'RmNo', align: 'center' },
        {
          name: 'ReserveResource',
          label: 'Reserve Resource',
          field: 'ReserveResource',
          align: 'center'
        },
        { name: 'CreatedDate', label: 'Created Date', field: 'CreatedDate', align: 'center' }
      ]
    }
  },
  data() {
    return {
      api: new this.$Api('root'),
      data: []
    }
  },
  mounted() {
    this.getValueDashboard()
  },

  created() {
    this.updateTime()

    setInterval(() => {
      this.updateTime()
    }, 60000)
  },
  methods: {
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
      this.api.get(`dashboard`, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.resv.reservation)
          const { currData } = data
          console.log(currData)
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
          ReserveResource: { data: res.reservation.reserver.resourceName, style: {} },
          CreatedDate: { data: formatDate(res.created_at), style: {} }
        })
      })
      this.data = list
    }
  }
})
</script>

<style>
.q-date__view.q-date__calendar {
  padding-right: 0;
  padding-left: 0;
}
</style>
