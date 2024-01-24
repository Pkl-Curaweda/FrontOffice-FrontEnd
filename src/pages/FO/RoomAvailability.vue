<template>
  <q-page style="overflow-y: hidden; min-width: max-content">
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
          <q-list>
            <q-item clickable v-close-popup @click="setSortingDisplay('T_DELUXE')">
              <q-item-section>DELUXE</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="setSortingDisplay('T_STANDARD')">
              <q-item-section>STANDARD</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="setSortingDisplay('T_FAMILY')">
              <q-item-section>FAMILY</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>101-110</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>110-101</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="setSortingDisplay('B_TWIN')">
              <q-item-section>Twin Bed</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="setSortingDisplay('B_KING')">
              <q-item-section>King Bed</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="setSortingDisplay('B_SINGLE')">
              <q-item-section>Single Bed</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical />

        <!--Search Button-->
        <q-input
          v-model="searchInput"
          borderless
          label="Name"
          class="q-pl-sm"
          type="search"
          style="display: flex; justify-content: center"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="primary" />
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
        </q-btn-dropdown>
      </template>
    </FOMenubar>
    <q-separator> </q-separator>
    <MultiPane>
      <template #upper>
        <!--Table-->
        <!--Table-->
        <div class="my-table">
          <q-table
            class="no-shadow"
            v-model:pagination="pagination"
            @request="onPaginationChange"
            :rows="data"
            hide-bottom
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
                        v-for="(col, i) in props.cols.label"
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
                  <q-td :style="cell.style" @click="!cell.data.label ? '' : getDetailform(cell.data.resvId, cell.data.resvRoomId) && triggerPositive()">
                    {{ cell.data.label }}
                    <!-- <q-popup-edit v-if="cell.data.label" v-model="props.row.name" title="" auto-save>
                      <q-list style="align-content: flex-end; width: 100%">
                        <q-item
                          clickable
                          v-close-popup
                          @click="getDetailform(cell.data.resvId, cell.data.resvRoomId)"
                          style="
                            display: flex;
                            padding: 5px;
                            border-radius: 30px;
                          "
                        >
                          <q-item-section>
                            <q-item-label style="color: black" class="font-bold"
                              >{{ cell.data.label? cell.data.label : ''   }}</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                      </q-list></q-popup-edit
                    > -->
                  </q-td>
                </template>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
      <template #lower>
        <GuestForm />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import { useQuasar } from 'quasar'
import GuestForm from './fragments/GuestForm.vue'
import { allObjectsInArray } from 'src/utils/datatype'
import { list } from 'postcss'

export default defineComponent({
  name: 'RoomAvailabilityPage',
  components: { FOMenubar, MultiPane, GuestForm },
  setup() {
    const $q = useQuasar()
    return {
      selectedSorting: ref(''),
      datePicker: ref({ from: '', to: '' }),
      sortingDisplay: ref(null),
      columns: [
        { name: 'Date', label: 'Date', field: 'Date', align: 'left' },
        { name: '101-DLX-K', label: '101-DLX-K', field: 'room_1', align: 'left' },
        { name: '102-DLX-K', label: '102-DLX-K', field: 'room_2', align: 'left' },
        { name: '103-DLX-K', label: '103-DLX-K', field: 'room_3', align: 'left' },
        { name: '104-DLX-K', label: '104-DLX-K', field: 'room_4', align: 'left' },
        { name: '105-STD-S', label: '105-FML-T', field: 'room_5', align: 'left' },
        { name: '106-STD-S', label: '106-FML-T', field: 'room_6', align: 'left' },
        { name: '107-STD-S', label: '107-FML-T', field: 'room_7', align: 'left' },
        { name: '108-FML-T', label: '108-STD-S', field: 'room_8', align: 'left' },
        { name: '109-FML-T', label: '109-STD-S', field: 'room_9', align: 'left' },
        { name: '110-FML-T', label: '110-STD-S', field: 'room_10', align: 'left' }
      ],
      allObjectsInArray,
      searchInput: ref('')
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      data: []
    }
  },

  mounted() {
    this.fetchData()
  },
  watch() {
    searchName(this.searchInput)
  },
  watch: {
    filterColumns: {
      handler(filters) {
        console.log(filters)
      },
      deep: true
    },
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    },
    searchInput: {
      handler(newSearchInput) {
        this.searchName(newSearchInput)
      },
      immediate: true
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        this.fetchData()
      }
    }
  },
  methods: {
    getDetailform(resvId, resvRoomId){
      this.$ResvStore.currentResvId = resvId
      this.$ResvStore.currentRoomResvId = resvRoomId
      console.log(resvId, resvRoomId)
    },
    searchName(searchInput) {
      // Make an API call to search based on searchInput
      this.api.get(`roomavail?search=${searchInput}`, ({ status, data }) => {
        if (status === 200) {
          // Update the data with the search result
          this.formatData(data.logData, data.roomAverage)
        } else {
          console.error('Error searching data')
        }
      })
    },
    setSortingDisplay(option) {
      this.sortingDisplay = option
      this.fetchData()
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    formatAverage(num) {
      return num.toFixed(1)
    },
    fetchData() {
      this.loading = true

      let url = `roomavail?`

      const fromDate = this.datePicker.from.replace(/\//g, '-')
      const toDate = this.datePicker.to.replace(/\//g, '-')

      if (fromDate !== '' && toDate !== '') {
        url += `&date=${fromDate}+${toDate}`
      }

      // Adjust the condition here
      if (this.sortingDisplay !== null) {
        url += `filter=${this.sortingDisplay}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.logData, data.roomAverage)
          console.log(data)
          this.pagination = {
            page: data.meta?.currPage,
            rowsNumber: data.meta?.total,
            rowsPerPage: data.meta?.perPage
          }
        }
      })
    },
    formatData(raw = [], avg = []) {
      console.log(raw, avg)
      const list = []

      raw.forEach((rh) => {
        const date = rh.date
        list.push({
          Date: { data: { label: date }, style: {} },
          ...rh.rmHist
        })
      })

      list.push({
        Date: { data: { label: 'Room Average' }, style: {} },
        room_1: { data: { label: avg.total_1 + '%'}, style: {} },
        room_2: { data: { label: avg.total_2+ '%'}, style: {} },
        tiga: { data: { label: avg.total_3+ '%'}, style: {} },
        empat: { data: { label: avg.total_4+ '%'}, style: {} },
        lima: { data: { label: avg.total_5+ '%'}, style: {} },
        enam: { data: { label: avg.total_6+ '%'}, style: {} },
        tujuh: { data: { label: avg.total_7+ '%'}, style: {} },
        delapan: { data: { label: avg.total_8+ '%'}, style: {} },
        sembilan: { data: {label: avg.total_9+ '%'}, style: {} },
        sepuluh: { data: {label: avg.total_10 + '%'}, style: {} }
      })
      this.data = list
      console.log('list data after pushing room average:', this.data)
    },
    triggerNegative (data) {
        this.$q.notify(
          {
          type: 'negative',
          message: data || 'error',
          timeout: 1000
        },
        4000
        )
      },
      triggerPositive (data) {
        this.$q.notify(
          {
          type: 'positive',
          message: data || 'data has successfully',
          timeout: 1000
        },
        4000
        )
      },
  }
})
</script>

<style>
.separator-line {
  width: 100%;
  border-top: 1px solid #000; /* Warna garis dan gaya bisa disesuaikan */ /* Sesuaikan margin agar terlihat rapih */
}
</style>
