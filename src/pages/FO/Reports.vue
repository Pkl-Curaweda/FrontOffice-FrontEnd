<template>
  <q-page class="column" style="overflow-y: hidden; min-width: max-content;">
    <FOMenubar>
      <template #left>
        <!--Sorting Dropdown-->
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          label="Sorting"
          dropdown-icon="o_expand_more"
        >
          <!--Konten Dropdown-->
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Most Revenue</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Less Revenue</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical />

        <!--Search Button-->
        <q-input v-model="searchInput" borderless dense label="Name" type="search">
          <template v-slot:prepend>
            <q-icon name="search" class="q-ml-sm" color="primary" />
          </template>
        </q-input>
        <q-separator vertical />

        <!-- date picker  -->
        <q-btn-dropdown
          flat
          square
          range
          class="text-capitalize"
          label="TDate - FDate"
          icon="o_event"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
        </q-btn-dropdown>
        <!---->
        <q-separator vertical />

        <!--Display Option-->
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          label="Display Option"
          dropdown-icon="o_expand_more"
        >
          <q-option-group :options="DisplayOptions" type="radio" v-model="DisplayOpt" />
        </q-btn-dropdown>
      </template>
    </FOMenubar>

    <MultiPane>
      <template #upper>
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
                <q-th
                  style="padding-top: 0px; padding-bottom: 0px"
                >
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
                  <template v-slot:body="props">
                    <q-tr :props="props">
                    </q-tr>
                  </template>

                </q-th>
              </q-tr>
            </template>

          </q-table>
        </div>
      </template>
      <template #lower>
        <ReportInsight />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import ReportInsight from 'src/pages/FO/fragments/ReportInsight.vue'
import { formatDate } from 'src/utils/time'
import { defineComponent, ref, watch } from 'vue'
import { allObjectsInArray } from 'src/utils/datatype'

export default defineComponent({
  name: 'ReportsPage',
  components: { FOMenubar, ReportInsight, MultiPane },
  setup () {
    return {
      allObjectsInArray,
      loading: ref(false),
      searchInput: ref(''),
      datePicker: ref({ from: '', to: '' }),
      DisplayOpt: ref(null),
      DisplayOptions: [
        { label: 'Per-Day', value: 'perday' },
        { label: 'Per-Week', value: 'perweek' },
        { label: 'Per-Month', value: 'permonth' },
        { label: 'Per-Years', value: 'peryears' }
      ],
      columns: [
        { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
        { name: 'RmAvailable', label: 'Room Available', align: 'left', field: 'RmAvailable' },
        { name: 'Occupied', label: 'Occupied', align: 'left', field: 'Occupied' },
        { name: 'Occ', label: 'Occ%', align: 'left', field: 'Occ%' },
        { name: 'RmRevenue', label: 'Room Revenue', align: 'left', field: 'RmRevenue' },
        { name: 'Arr', label: 'Arr', align: 'left', field: 'Arr' },
        { name: 'MTDRmAvail', label: 'MTD Rm. Avail', field: 'MTDRmAvail', align: 'left' },
        { name: 'MTDRNo', label: 'MTD RNo', align: 'left', field: 'MTDRNo' },
        { name: 'MTDOcc', label: 'MTD Occ%', align: 'left', field: 'MTDOcc%' },
        { name: 'MTDRmRevenue', label: 'MTD Rm. Revenue', align: 'left', field: 'MTDRmRevenue' },
        { name: 'MTDARR', label: 'MTD ARR', align: 'left', field: 'MTDARR' },
      ]
    }
  },
  // data() {
  //   return {
  //     api: new this.$Api('frontoffice'),
  //     pagination: {
  //       page: 1,
  //       rowsNumber: 0,
  //       rowsPerPage: 20
  //     },
  //     data: []
  //   }
  // },
  // mounted() {
  //   this.fetchData()
  // },
  // watch: {
  //   DisplayOpt: {
  //     handler(option) {
  //       this.fetchData()
  //     }
  //   }
  // },
  // methods: {
  //   setRoomResv(data) {
  //     this.$ResvStore.currentResvId = data['ResNo'].data
  //     this.$ResvStore.currentRoomResvId = data['ResRoomNo'].data
  //   },
  //   onPaginationChange(props) {
  //     this.pagination = props.pagination
  //     this.fetchData()
  //   },
  //   fetchData() {
  //     this.loading = true

  //     let url = `/page/arrival?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`

  //     if (this.DisplayOpt !== null) url += `&disOpt=${this.DisplayOpt}`

  //     this.api.get(url, ({ status, data }) => {
  //       this.loading = false

  //       if (status == 200) {
  //         this.formatData(data.reservations)
  //         this.pagination = {
  //           page: data.meta?.currPage,
  //           rowsNumber: data.meta?.total,
  //           rowsPerPage: data.meta?.perPage
  //         }
  //       }
  //     })
  //   },
  //   formatData(raw = []) {
  //     const list = []

  //     raw.forEach((rsrv) => {
  //       rsrv.reservation.forEach((rr) => {
  //         list.push({
  //           ResNo: { data: rsrv.reservationId, style: {} },
  //           ResRoomNo: { data: rr.id, style: {} },
  //           ResResource: { data: rr.reservation.reserver.resourceName, style: {} },
  //           RmNo: {
  //             data: rr.room.id,
  //             style: {
  //               backgroundColor: rr.reservation.resvStatus.rowColor,
  //               textColor: rr.reservation.resvStatus.textColor
  //             }
  //           },
  //           RType: { data: rr.room.roomType, style: {} },
  //           BType: { data: rr.room.bedSetup, style: {} },
  //           GuestName: { data: rr.reservation.reserver.guest.name, style: {} },
  //           Arr: { data: rr.arrangment.id, style: {} },
  //           Arrival: { data: formatDate(rr.reservation.arrivalDate), style: {} },
  //           Depart: { data: formatDate(rr.reservation.departureDate), style: {} },
  //           Night: { data: rr.reservation.manyNight, style: {} },
  //           RoomBoy: { data: rr.roomMaids, style: {} },
  //           RoomRate: { data: rr.arrangment.rate, style: {} },
  //           CreatedDate: { data: formatDate(rr.reservation.created_at), style: {} }
  //         })
  //       })
  //     })
  //     this.data = list
  //   }
  // }
})
</script>
