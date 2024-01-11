<template>
  <q-page class="column" style="overflow-y: hidden; min-width: max-content">
    <FOMenubar>
      <template #left>
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          label="Sorting"
          dropdown-icon="o_expand_more"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>MostRevenue</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Less Revenue</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical />

        <q-input v-model="searchInput" borderless label="Name" type="search">
          <template v-slot:prepend>
            <q-icon name="search" class="q-ml-sm" color="primary" />
          </template>
        </q-input>
        <q-separator vertical />

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
        <q-separator vertical />
        <q-btn-dropdown
          flat
          square
          range
          class="text-capitalize text-black"
          label="Display Option"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Day</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Week</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Month</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Per-Year</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
      <template #right>
        <q-btn flat square color="primary" icon="o_print" to="/fo/print" />
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
        <ReportInsight />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import { formatDate } from 'src/utils/time'
import { defineComponent, ref, watch } from 'vue'
import { allObjectsInArray } from 'src/utils/datatype'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import ReportInsight from 'src/pages/FO/fragments/ReportInsight.vue'

export default defineComponent({
  name: 'ReportsPage',
  components: { FOMenubar, ReportInsight, MultiPane },
  setup() {
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
      ]
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
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    }
  },
  methods: {
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      let url = `report`
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.reports)
          this.labelData(data.reports.added)
          this.pagination = {
            page: data.meta?.currPage,
            rowsNumber: data.meta?.total,
            rowsPerPage: data.meta?.perPage
          }
        }
      })
    },
    formatData(raw = []) {
      const list = []

      raw.forEach((rp) => {
        list.push({
          Date: { data: rp.date, style: {} },
          RmAvailable: { data: rp.roomAvailable, style: {} },
          Occupied: { data: rp.occupied, style: {} },
          Occ: { data: rp.occ, style: {} },
          RmRevenue: { data: rp.roomRevenue, style: {} },
          Arr: { data: rp.arr, style: {} },
          RmAvail: { data: rp.added.rm_avail, style: {} },
          Rno: { data: rp.added.rno, style: {} },
          tdOcc: { data: rp.added.occ, style: {} },
          tdRmRevenue: { data: rp.added.rev, style: {} },
          tdArr: { data: rp.added.arr, style: {} }
        })
      })
      console.log(this.data, list)
      this.data = list
      console.log(this.data)
    },
    labelData(raw = []) {
      const list = []

      raw((label) => {
        list.push({
          columns: [
            { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
            { name: 'RmAvailable', label: 'Room Available', align: 'left', field: 'RmAvailable' },
            { name: 'Occupied', label: 'Occupied', align: 'left', field: 'Occupied' },
            { name: 'Occ', label: 'Occ%', align: 'left', field: 'Occ' },
            { name: 'RmRevenue', label: 'Room Revenue', align: 'left', field: 'RmRevenue' },
            { name: 'Arr', label: 'Arr', align: 'left', field: 'Arr' },
            { name: 'RmAvail', label: '', align: 'left', field: 'RmAvail' },
            { name: 'Rno', label: '', align: 'left', field: 'Rno' },
            { name: 'tdOcc', label: '', align: 'left', field: 'tdOcc' },
            { name: 'tdRmRevenue', label: '', align: 'left', field: 'tdRmRevenue' },
            { name: 'tdArr', label: '', align: 'left', field: 'tdArr' }
          ]
        })
      })
      this.columns = list
    }
  }
})
</script>
