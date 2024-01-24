<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <FOMenubar />

    <div class="row q-ma-md no-wrap" style="gap: 15px">
      <div style="width: 50%">
        <div class="my-table q-pb-md" ref="pdfContainer">
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
      <!-- <iframe src="src/assets/pdf/invoicePdf.pdf" frameborder="0"></iframe> -->
      <div class="column justify-between" style="width: 50%; gap: 15px">
        <div class="column" style="gap: 10px">
          <div class="row justify-between" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%">Page</p>
            <p class="q-my-auto">2 Pages</p>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%">Forecast</p>
            <q-select
              outlined
              dense
              v-model="forecast"
              :options="forecastOpt"
              label="Per-"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-select>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%">Destination</p>
            <q-select
              outlined
              dense
              v-model="destination"
              :options="destinationOpt"
              label="Save as"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            >
              <template v-slot:prepend>
                <q-icon name="note" />
              </template>
            </q-select>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%">Pages</p>
            <q-select
              outlined
              dense
              v-model="pages"
              :options="pagesOpt"
              label="Pages"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            />
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%">Pages per sheet</p>
            <q-select
              outlined
              dense
              v-model="pagesper"
              :options="pagesperOpt"
              label="Pages per sheet"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            />
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%">Margin</p>
            <q-select
              outlined
              dense
              v-model="margin"
              :options="marginOpt"
              label="Margin"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            />
          </div>
        </div>
        <div style="gap: 8px" class="q-mt-lg row no-wrap items-center justify-end">
          <q-btn
            label="Print"
            @click="print"
            unelevated
            color="primary"
            dense
            class="text-capitalize q-px-md q-py-sm"
          />
          <q-btn
            label="Save"
            unelevated
            color="primary"
            dense
            class="text-capitalize q-px-md q-py-sm"
          />
          <q-btn
            label="Cancel"
            outline
            color="primary"
            dense
            class="text-capitalize q-px-md q-py-sm"
          />
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
      forecast: ref(null),
      forecastOpt: ['Per-Day', 'Per-Week', 'Per-Month'],
      destination: ref(null),
      destinationOpt: ['Save As PDF', 'Custom'],
      pages: ref(null),
      pagesOpt: ['All', 'Custom'],
      pagesper: ref(null),
      pagesperOpt: ['1', 'Custom'],
      margin: ref(null),
      marginOpt: ['Default', 'Custom'],
      billNumber: ref(),
      reservationResource: ref(),
      guestName: ref(),
      arrival: ref(),
      departure: ref(),
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
        { name: 'tdArr', label: `DTD ARR`, align: 'left', field: 'tdArr' }
      ]
    }
  },
  components: { FOMenubar },
  data() {
    return {
      url: '',
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
    this.getDataTable()
  },
  methods: {
    print() {
      const element = this.$refs.pdfContainer

      html2pdf(element, {
        margin: 0,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      })
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    getDataTable() {
      this.loading = true

      let url = `report`
      this.url = url
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.reports)

          this.billNumber = data.billNumber
          this.reservationResource = data.resourceName
          this.guestName = data.guestName
          this.arrival = data.arrivalDate
          this.departure = data.departureDate
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
