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
          <!--Konten Dropdown-->
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Deluxe</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Standard</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Family </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>101-110</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>110-101</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Twin Bed</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>King Bed</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Single Bed</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical />

        <!--Search Button-->
        <q-input v-model="searchInput" borderless label="Name" type="search">
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
      </template>
      <template #lower>
        <GuestForm />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import GuestForm from './fragments/GuestForm.vue'
import { allObjectsInArray } from 'src/utils/datatype'
import { list } from 'postcss'

export default defineComponent({
  name: 'RoomAvailabilityPage',
  components: { FOMenubar, MultiPane, GuestForm },
  setup() {
    return {
      datePicker: { from: null, to: null },
      columns: [
        { name: 'Date', label: '', field: 'Date', align: 'left' },
        { name: '101-DLX-K', label: '101-DLX-K', field: 'satu', align: 'left' },
        { name: '102-DLX-K', label: '102-DLX-K', field: 'dua', align: 'left' },
        { name: '103-DLX-K', label: '103-DLX-K', field: 'tiga', align: 'left' },
        { name: '104-DLX-K', label: '104-DLX-K', field: 'empat', align: 'left' },
        { name: '105-STD-S', label: '105-STD-S', field: 'lima', align: 'left' },
        { name: '106-STD-S', label: '106-STD-S', field: 'enam', align: 'left' },
        { name: '107-STD-S', label: '107-STD-S', field: 'tujuh', align: 'left' },
        { name: '108-FML-T', label: '108-FML-T', field: 'delapan', align: 'left' },
        { name: '109-FML-T', label: '109-FML-T', field: 'sembilan', align: 'left' },
        { name: '110-FML-T', label: '110-FML-T', field: 'sepuluh', align: 'left' }
      ],
      allObjectsInArray
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
  watch: {
    filterColumns: {
      handler(filters) {
        console.log(filters)
        // Add logic to update the table data based on filters if needed
      },
      deep: true
    }
    // Watch for changes in the 'pagination' property and fetch data accordingly
  },
  methods: {
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    formatAverage(num) {
      return num.toFixed(1)
    },
    fetchData() {
      this.loading = true

      let url = `roomavail?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
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
        const rlist = Object.values(rh.roomHistory)

        rlist.forEach((r) => {
          const textColor = r.resvStatus ? r.resvStatus.textColor : ''
          const rowColor = r.resvStatus ? r.resvStatus.rowColor : ''

          list.push({
            Date: { data: date, style: {} },
            satu: {
              data: r.guestName,
              style: { backgroundColor: rowColor, color: textColor }
            },
            dua: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            tiga: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            empat: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            lima: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            enam: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            tujuh: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            delapan: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            sembilan: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } },
            sepuluh: { data: r.guestName, style: { backgroundColor: rowColor, color: textColor } }
          })
        })
      })

      list.push({
        Date: { data: 'Room Average', style: {} },
        satu: { data: this.formatAverage(avg.total_1), style: {} },
        dua: { data: this.formatAverage(avg.total_2), style: {} },
        tiga: { data: this.formatAverage(avg.total_3), style: {} },
        empat: { data: this.formatAverage(avg.total_4), style: {} },
        lima: { data: this.formatAverage(avg.total_5), style: {} },
        enam: { data: this.formatAverage(avg.total_6), style: {} },
        tujuh: { data: this.formatAverage(avg.total_7), style: {} },
        delapan: { data: this.formatAverage(avg.total_8), style: {} },
        sembilan: { data: this.formatAverage(avg.total_9), style: {} },
        sepuluh: { data: this.formatAverage(avg.total_10), style: {} }
      })

      this.data = list
    }
  }
})
</script>
