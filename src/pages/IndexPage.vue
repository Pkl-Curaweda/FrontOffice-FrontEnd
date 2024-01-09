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
          <q-btn icon="o_add" color="primary" label="Create new reservation" />
        </div>

        <div class="row no-wrap q-my-lg" style="gap: 16px">
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_calendar_today" />
            </div>
            <div>
              <p class="label">New Reservations</p>
              <h5 class="data">008</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_bed" />
            </div>
            <div>
              <p class="label">Available Rooms</p>
              <h5 class="data">008</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_login" />
            </div>
            <div>
              <p class="label">Check In</p>
              <h5 class="data">005</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_logout" />
            </div>
            <div>
              <p class="label">Check Out</p>
              <h5 class="data">005</h5>
            </div>
          </div>
          <div class="dashboard-box">
            <div class="icon">
              <q-icon name="o_query_stats" />
            </div>
            <div>
              <p class="label">Occupancy Rate</p>
              <h5 class="data">50%</h5>
            </div>
          </div>
        </div>

        <div class="flex q-gutter-md no-wrap">
          <div class="col-grow q-pa-md bg-white rounded shadow-3" style="max-width: 660px">
            <h5 class="text-bold q-ma-none">Recent Reservation Schedule</h5>
            <q-date
              v-model="recentReservationDate"
              class="no-shadow q-pa-none"
              style="width: 100%"
              minimal
            />
            <div class="my-table">
              <q-table clas :rows="recentReservationData" :columns="recentReservationColumns">
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td v-for="(cell, i) in props.row" :key="i" :style="cell.style">
                      {{ cell.data }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
          <div class="col-grow">
            <div class="q-pa-md q-mb-md bg-white rounded shadow-3">
              <h5 class="text-bold q-ma-none">Reservation Statistics</h5>
              <ReservationChart/>
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
import { ref, defineAsyncComponent } from 'vue'
import MessengerFloat from 'src/components/MessengerFloat.vue'
import { getCurrentTime } from 'src/utils/time'

const ReservationChart = defineAsyncComponent(() =>
  import('components/charts/ReservationChart.vue')
)

export default {
  setup() {
    const leftDrawerOpen = ref(false),
      currentClock = '-',
      currentDate = '-'

    const recentReservationDate = ref('')

    const recentReservationColumns = [
      { name: 'ResNo', label: 'ResNo', field: 'ResNo' },
      { name: 'GuestName', label: 'Guest Name', field: 'GuestName' },
      { name: 'RmNo', label: 'RmNo', field: 'RmNo' },
      { name: 'ReserveResource', label: 'Reserve Resource', field: 'ReserveResource' },
      { name: 'CreatedDate', label: 'Created Date', field: 'CreatedDate' }
    ]

    const recentReservationData = [
      {
        ResNo: { data: '188086', style: {} },
        GuestName: { data: 'RONO RUSTAN, HENRY', style: {} },
        RmNo: { data: '101', style: { backgroundColor: 'green', color: '#ffffff' } },
        ReserveResource: { data: 'WhatsApp', style: {} },
        CreatedDate: { data: '12/11/23', style: {} }
      },
      {
        ResNo: { data: '188085', style: {} },
        GuestName: { data: 'DZAKIYA', style: {} },
        RmNo: { data: '102', style: { backgroundColor: 'yellow', color: '#000000' } },
        ReserveResource: { data: 'Walk-In', style: {} },
        CreatedDate: { data: '12/11/23', style: {} }
      },
      {
        ResNo: { data: '188084', style: {} },
        GuestName: { data: 'FACHRI', style: {} },
        RmNo: { data: '103', style: { backgroundColor: 'red', color: '#ffffff' } },
        ReserveResource: { data: 'WhatsApp', style: {} },
        CreatedDate: { data: '12/11/23', style: {} }
      },
      {
        ResNo: { data: '188083', style: {} },
        GuestName: { data: 'BENI', style: {} },
        RmNo: { data: '104', style: { backgroundColor: 'white', color: '#000000' } },
        ReserveResource: { data: 'WhatsApp', style: {} },
        CreatedDate: { data: '12/11/23', style: {} }
      }
    ]

    return {
      leftDrawerOpen,
      currentClock,
      currentDate,
      recentReservationDate,
      recentReservationColumns,
      recentReservationData
    }
  },
  components: { SideBar, ProfileFloat, MessengerFloat, ReservationChart },
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
