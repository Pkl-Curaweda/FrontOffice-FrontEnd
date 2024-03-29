<template>
  <q-page style="overflow-y: hidden; min-width: max-content">
    <FOMenubar>
      <template #left>
        <!--Sorting Dropdown-->
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          :label="sortingLabel"
          dropdown-icon="o_expand_more"
        >
          <q-list v-for="(type, i) in listOfSortTypes" :key="i">
            <q-item clickable v-close-popup @click="setSortingDisplay(type)">
              <q-item-section>{{ type.label }}</q-item-section>
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
          :label="datePickerLabel"
          icon="o_event"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
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
            :loading="loading"
            :columns="columns"
            hide-bottom
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
                  <q-td
                    class="cursor-pointer"
                    :style="cell.style"
                    @click="
                      !cell.data.resvId
                        ? ''
                        : getDetailform(cell.data.resvId, cell.data.resvRoomId) && triggerPositive()
                    "
                  >
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
import socket from '../../services/socket/socket'
import { storeRoomAvailabilityFromTo } from '../../stores/roomAvailStore'
import { list } from 'postcss'

export default defineComponent({
  name: 'RoomAvailabilityPage',
  components: { FOMenubar, MultiPane, GuestForm },
  setup() {
    const $q = useQuasar()
    return {
      selectedSorting: ref(''),
      datePicker: ref({ from: '', to: '' }),
      datePickerLabel: ref('TDate - FDate'),
      storedRange: storeRoomAvailabilityFromTo,
      sortingDisplay: ref(null),
      columns: ref([]),
      sortingLabel: ref('Sorting'),
      listOfSortTypes: ref(),
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
    console.log('Room Availability')
    this.fetchData()
    socket.on('resv', (data) => {
      console.log('Ada disini')
      this.fetchData()
    })
  },
  watch() {
    searchName(this.searchInput)
  },
  watch: {
    filterColumns: {
      handler(filters) {},
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
    sortingDisplay: {
      handler(val) {
        this.sortingLabel = val.label
      }
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        this.datePickerLabel = 'TDate - FDate'
        if (newDateRange) {
          this.storedRange = newDateRange
          function formatDateRange() {
            const options = { day: 'numeric', month: 'long' }
            const fromDate = new Date(newDateRange?.from)
            const toDate = new Date(newDateRange?.to)
            const formattedFromDate = fromDate.toLocaleDateString('en-US', options)
            const formattedToDate = toDate.toLocaleDateString('en-US', options)
            return `${formattedFromDate} - ${formattedToDate}`
          }
          this.datePickerLabel = formatDateRange()
        }
        this.fetchData()
      }
    }
  },
  methods: {
    asctable() {
      this.sortingDisplay = 'R_ASC'
      this.fetchData()
    },
    getDetailform(resvId, resvRoomId) {
      this.$ResvStore.currentResvId = resvId
      this.$ResvStore.currentRoomResvId = resvRoomId
      this.$ResvStore.detail = true
    },
    searchName(searchInput) {
      // Make an API call to search based on searchInput
      this.searchData = searchInput
      this.fetchData()
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

      let url = `roomavail?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}&search=${this.searchData}`

      let { from, to } = this.storedRange
      const fromDate = from != undefined ? from.replace(/\//g, '-') : ''
      const toDate = to != null ? to.replace(/\//g, '-') : ''

      if (fromDate !== '' && toDate !== '') {
        url += `&date=${fromDate}+${toDate}`
      }

      // Adjust the condition here
      if (this.sortingDisplay !== null) {
        url += `&filter=${this.sortingDisplay.id}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.columns = data.roomHeaders
          this.listOfSortTypes = data.sortingType
          this.formatData(data.logData, data.roomAverage)
          this.pagination = {
            page: data.meta?.currPage,
            rowsNumber: data.meta?.total,
            rowsPerPage: data.meta?.perPage
          }
        }
      })
    },
    formatData(raw = [], avg = []) {
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
        ...avg
      })
      this.data = list
    },
    triggerNegative(data) {
      this.$q.notify(
        {
          type: 'negative',
          message: data || 'error',
          timeout: 1000
        },
        4000
      )
    },
    triggerPositive(data) {
      this.$q.notify(
        {
          type: 'positive',
          message: data || 'data has successfully',
          timeout: 1000
        },
        4000
      )
    }
  }
})
</script>

<style>
.separator-line {
  width: 100%;
  border-top: 1px solid #000; /* Warna garis dan gaya bisa disesuaikan */ /* Sesuaikan margin agar terlihat rapih */
}
</style>
