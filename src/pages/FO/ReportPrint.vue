<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <FOMenubar>
      <template #right>
        <div style="display: flex; justify-content: center; align-items: center; gap: 10px">
          <q-btn
            label="Save"
            @click="print"
            unelevated
            color="primary"
            dense
            class="text-capitalize q-px-lg"
          />
          <q-btn
            label="Cancel"
            dense
            outline
            color="primary"
            @click="pageref"
            class="text-capitalize q-px-md"
          />
        </div>
      </template>
    </FOMenubar>

    <div class="q-ma-md" style="gap: 15px">
      <!-- <iframe src="src/assets/pdf/invoicePdf.pdf" frameborder="0"></iframe> -->
      <div class="q-mx-md">
        <div class="column" style="gap: 10px">
          <div class="row justify-between" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%">Page</p>
            <p class="q-my-auto">{{ totalPages }} Pages</p>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto col-grow">Forecast</p>
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize rounded-borders"
              :label="filterDisplayLabel"
              color="primary"
              icon="event"
              dropdown-icon="o_expand_more"
            >
              <q-list>
                <q-item clickable v-close-popup @click="setFilterDisplay('day', 'Per-Day')">
                  <q-item-section>Per-Day</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('week', 'Per-Week')">
                  <q-item-section>Per-Week</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('month', 'Per-Month')">
                  <q-item-section>Per-Month</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('year', 'Per-Year')">
                  <q-item-section>Per-Year</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto col-grow">From To</p>
            <!-- Modify this part of your template -->
            <q-btn-dropdown
              flat
              square
              range
              class="text-capitalize"
              style="border: 1px #00000030 solid; border-radius: 5px"
              label="TDate - FDate"
              color="primary"
              icon="o_event"
              dropdown-icon="o_expand_more"
            >
              <div>
                <q-date v-model="datePicker" range />
              </div>
            </q-btn-dropdown>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto col-grow">Per Pages</p>
            <!-- Modify this part of your template -->
            <q-btn-dropdown
              flat
              square
              style="border: 1px #00000030 solid"
              class="text-capitalize rounded-borders"
              :label="filterDisplayLabelPerPages"
              color="primary"
              icon="event"
              dropdown-icon="o_expand_more"
              v-model="perPageOpt"
            >
              <q-list>
                <!-- Use v-for to generate options dynamically -->
                <q-item
                  v-for="perPageOpt in sumPerPagesOpt"
                  :key="perPageOpt"
                  clickable
                  v-close-popup
                  @click="setFilterDisplayPerPages(perPageOpt)"
                >
                  <q-item-section>Per Page {{ perPageOpt }}</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </div>
      <div class="q-mt-lg" style="display: flex; justify-content: center; align-items: center">
        <div class="my-table col-grow q-pb-md" ref="pdfContainer">
          <q-table
            class="no-shadow"
            :rows-per-page-options="[0]"
            :rows="data"
            hide-bottom
            :loading="loading"
            :columns="columns"
            row-key="name"
          >
            <template>
              <q-tr>
                <q-th>
                  <template v-slot:header="props">
                    <q-tr :props="props">
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
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import html2pdf from 'html2pdf.js'

export default defineComponent({
  name: 'Print',
  setup() {
    return {
      filterDisplay: ref('day'),
      filterDisplayLabel: ref('Per-Day'),
      filterDisplayLabelPages: ref('Page 1'),
      filterDisplayLabelPerPages: ref('Per Page 1'),
      datePicker: ref({ from: '', to: '' }),
      perPageOpt: ref(20),
      pageOpt: 1,
      columns: [
        { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
        { name: 'RmAvailable', label: 'Room Available', align: 'left', field: 'RmAvailable' },
        { name: 'Occupied', label: 'Occupied', align: 'left', field: 'Occupied' },
        { name: 'Occ', label: 'Occ%', align: 'left', field: 'Occ' },
        { name: 'RmRevenue', label: 'Room Revenue', align: 'left', field: 'RmRevenue' },
        { name: 'Arr', label: 'Arr', align: 'left', field: 'Arr' },
        { name: 'RmAvail', label: `DTD Rm.Avail`, align: 'left', field: 'RmAvail' },
        { name: 'Rno', label: `DTD RNO`, align: 'left', field: 'Rno' },
        { name: 'tdOcc', label: `DTD Occ %`, align: 'left', field: 'tdOcc' },
        { name: 'tdRmRevenue', label: `DTD Rm.Revenue`, align: 'left', field: 'tdRmRevenue' },
        { name: 'tdArr', label: `DTD ARR`, align: 'left', field: 'tdArr' },
        { name: 'TaxService', label: `Tax & Service`, align: 'left', field: 'taxService' }
      ]
    }
  },
  components: { FOMenubar },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      sumPagesOpt: [],
      sumPerPagesOpt: ref(),
      data: []
    }
  },
  mounted() {
    this.getDataTable()
  },
  watch: {
    filterDisplay(newOption) {
      // Update the label based on the selected option
      this.updateFilterDisplayLabel(newOption)
    },
    filterDisplay: {
      handler(option) {
        this.getDataTable()
      }
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        this.getDataTable()
      }
    }
  },
  methods: {
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.updateFilterDisplayLabel(option)
      this.getDataTable()
    },
    setFilterDisplayPages(option) {
      this.pageOpt = parseInt(option)
      this.filterDisplayLabelPages = `Page ${option}`
      this.getDataTable()
    },
    setFilterDisplayPerPages(option) {
      this.perPageOpt = option
      this.filterDisplayLabelPerPages = `Page ${option}`
      this.getDataTable()
    },
    updateFilterDisplayLabel(option) {
      // Logic to update the label based on the selected option
      switch (option) {
        case 'day':
          this.filterDisplayLabel = 'Per-Day'
          break
        case 'week':
          this.filterDisplayLabel = 'Per-Week'
          break
        case 'month':
          this.filterDisplayLabel = 'Per-Month'
          break
        case 'year':
          this.filterDisplayLabel = 'Per-Year'
          break
        // Add other cases as needed
        default:
          this.filterDisplayLabel = 'Default Label'
      }
    },
    print() {
      const element = this.$refs.pdfContainer

      html2pdf(element, {
        margin: 0,
        filename: `Report ${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'landscape',
          putOnlyUsedFonts: true,
          // Sesuaikan skala jika diperlukan
          scale: 0.8
        }
      })
    },
    getDataTable() {
      this.loading = true

      let url = `report?perPage=20`

      const fromDate = this.datePicker != null ? this.datePicker.from.replace(/\//g, '-') : ''
      const toDate = this.datePicker != null ? this.datePicker.to.replace(/\//g, '-') : ''

      if (fromDate !== '' && toDate !== '') {
        url += `&date=${fromDate}+${toDate}`
      }

      if (this.filterDisplay) {
        url += `&disOpt=${this.filterDisplay}`
      }
      if (this.pageOpt) {
        url += `&page=${this.pageOpt}`
      }

      // if (this.perPageOpt !== null) {
      //   url += `&perPage=${this.perPageOpt}`
      // }
      this.url = url
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { meta } = data

          const identifier = data.ident
          this.columns = [
            { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
            { name: 'RmAvailable', label: 'Room Available', align: 'left', field: 'RmAvailable' },
            { name: 'Occupied', label: 'Occupied', align: 'left', field: 'Occupied' },
            { name: 'Occ', label: 'Occ%', align: 'left', field: 'Occ' },
            { name: 'RmRevenue', label: 'Room Revenue', align: 'left', field: 'RmRevenue' },
            { name: 'Arr', label: 'Arr', align: 'left', field: 'Arr' },
            { name: 'RmAvail', label: `${identifier} Rm.Avail`, align: 'left', field: 'RmAvail' },
            { name: 'Rno', label: `${identifier} RNO`, align: 'left', field: 'Rno' },
            { name: 'tdOcc', label: `${identifier} Occ %`, align: 'left', field: 'tdOcc' },
            {
              name: 'tdRmRevenue',
              label: `${identifier} Rm.Revenue`,
              align: 'left',
              field: 'tdRmRevenue'
            },
            { name: 'tdArr', label: `${identifier} ARR`, align: 'left', field: 'tdArr' },
            { name: 'TaxService', label: `Tax & Service`, align: 'left', field: 'taxService' }
          ]

          this.totalPages = meta.lastPage

          // Update sumPagesOpt based on lastPage value
          this.sumPagesOpt = Array.from({ length: meta.lastPage }, (_, i) => i + 1).map(String)

          // Update sumPerPagesOpt based on perPage value from meta
          this.sumPerPagesOpt = { length: meta.perPage }

          this.formatData(data.reports)
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
          tdArr: { data: rp.added.arr, style: {} },
          taxSerive: { data: rp.taxService.taxed, style: {} }
        })
      })
      this.data = list
    },
    pageref() {
      this.$router.push({
        name: 'reports'
      })
    }
  }
})
</script>

<style>
.half-width-container {
  max-width: 50%; /* Sesuaikan dengan persentase yang diinginkan */
  margin: auto; /* Agar tetap di tengah */
}
.scrollable-table {
  max-height: 100%;
  overflow-y: auto;
}
</style>
