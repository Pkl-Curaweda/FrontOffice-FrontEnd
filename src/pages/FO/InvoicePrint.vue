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
          <q-btn label="Cancel" dense outline color="primary" @click="pageref" class="text-capitalize q-px-md" />
        </div>
      </template>
    </FOMenubar>

    <div class="row no-wrap" style="gap: 15px; margin: 0 30vw">
      <div class="col-grow" ref="pdfContainer">
        <q-img
          src="../../assets/img/lingian-logo-colored.png"
          style="
            width: 10rem;
            height: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          class="q-mx-auto"
        />

        <div class="q-pb-sm">
          Bill Number: <span>{{ billNumber }}</span>
        </div>
        <div class="row q-pb-sm" style="justify-content: space-between">
          <div>
            Reservation Resource: <span class="text-bold">{{ reservationResource }}</span>
          </div>
          <div>
            Guest Name: <span class="text-bold">{{ guestName }}</span>
          </div>
        </div>

        <div style="background-color: #16a75c; height: 5px" class="col-grow"></div>

        <div class="row q-py-sm" style="justify-content: space-between; max-width: 30%">
          <div>Arrival:</div>
          <div>{{ arrival }}</div>
        </div>
        <div class="row q-pb-sm" style="justify-content: space-between; max-width: 30%">
          <div>Departure:</div>
          <div>{{ departure }}</div>
        </div>
        <div
          class="my-table q-pb-md"
          style="display: flex; justify-content: center; align-items: center"
        >
          <q-table
            class="no-shadow"
            v-model:pagination="pagination"
            @request="onPaginationChange"
            :rows="data"
            hide-bottom
            :loading="loading"
            :columns="columns"
            row-key="name"
            style="width: 60vw"
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
        <div style="background-color: #16a75c; height: 5px" class="col-grow"></div>
        <div class="q-py-md">
          Gedung lingian, Universitas Telkom, Jl. <br />
          telekomunikasi No.01, Terusan<br />
          Buahbatu, Bandung, Jawa Barat 40257 ;<br />
          Phone. +62 8112072999
        </div>
      </div>
      <!-- <iframe src="src/assets/pdf/invoicePdf.pdf" frameborder="0"></iframe> -->
      <!-- <div class="column justify-between" style="width: 50%; gap: 15px">
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
      </div> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import html2pdf from 'html2pdf.js'

const columns = [
  { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
  { name: 'Description', label: 'Description', align: 'left', field: 'Description' },
  { name: 'Amount', label: 'Amount', align: 'left', field: 'Amount' }
]

export default defineComponent({
  name: 'PrintInvoice',
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
      columns
    }
  },
  components: { FOMenubar },
  data() {
    return {
      url: '',
      api: new this.$Api('frontoffice'),
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
        margin: 10,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
    },
    pageref() {
      this.$router.push({
          name: 'guest-invoice',
        }
      )
    },
    getDataTable() {
      this.loading = true

      const { resvId, resvRoomId } = this.$route.params

      if (resvId === 0 || resvRoomId === 0) {
        this.loading = false
        console.log(resvId)
        return
      }

      let url = `invoice/${resvId}/${resvRoomId}/print`
      this.url = url
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.invoices)

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

      raw.forEach((ip) => {
        list.push({
          Date: { data: ip.billDate, style: {} },
          Description: { data: ip.desc, style: {} },
          Amount: { data: ip.amount, style: {} }
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
