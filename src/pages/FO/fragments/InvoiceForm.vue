<template>
  <div class="full-width">
    <div class="row q-pt-sm" style="gap: 5px">
      <div style="background-color: #008001; color: white; width: 700px" class="q-py-sm q-pl-sm">
        {{ backgroundedTotal || 0.0 }}
      </div>
      <div style="background-color: #008001; width: 20px"></div>
      <div style="background-color: #e4e4e4; color: #008444" class="q-pa-sm">
        <q-icon name="north_west" size="20px" />
      </div>
      <div style="background-color: #fdfd06" class="q-pa-sm">
        <q-icon name="north_east" size="20px" />
      </div>
      <div style="background-color: #fdfd06" class="q-py-sm col-grow q-pl-sm">
        {{ backgroundedBalance || 0.0 }}
      </div>
    </div>

    <div class="row items-center q-mt-md full-width" style="gap: 7px">
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Description:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          {{ description || '-' }}
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Qty:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          <!-- <q-input borderless :dense="dense" v-model="updatedQtyWithDefault" /> -->
          {{ updatedQtyWithDefault }}
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Rate:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          {{ rate || '-' }}
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Amount:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          {{ amount || '-' }}
        </div>
      </div>
      <div class="items-center col-grow">
        <div class="text-bold row" style="justify-content: space-between">
          <div>Payment</div>
          <div>Rp 0.00</div>
        </div>
        <q-separator class="" style="background: rgba(0, 0, 0, 0.5)" size="1.5px" />
      </div>
      <div class="items-center col-grow">
        <div class="text-bold row" style="justify-content: space-between">
          <div>Balance</div>
          <div>{{ balance || 'Rp 0.00' }}</div>
        </div>
        <q-separator class="" style="background: rgba(0, 0, 0, 0.5)" size="1.5px" />
      </div>

      <div class="row" style="gap: 7px">
        <q-btn
          unelevated
          dense
          class="text-capitalize q-px-sm"
          color="primary"
          label="Invoice"
          to="payment"
        />
        <q-btn
          flat
          square
          color="primary"
          icon="o_find_in_page"
          class="border-button rounded-borders"
          style="padding: 6px 3px"
          @click="viewBill = true"
        />

        <!-- dialog view bill on form invoice -->
        <q-dialog v-model="viewBill">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section class="items-center q-pb-none">
              <div class="row items-center">
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </div>
            </q-card-section>

            <q-card-section>
              <q-img
                src="../../../assets/img/lingian-logo-colored.png"
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
              <div class="my-table">
                <q-table
                  class="no-shadow"
                  v-model:pagination="pagination"
                  @request="onPaginationChange"
                  :rows="data"
                  :loading="loading"
                  hide-bottom
                  :columns="columns"
                  row-key="name"
                >
                  <template v-slot:header="props">
                    <q-tr class="table-head" :props="props">
                      <q-th
                        v-for="(col, i) in props.cols"
                        :key="i"
                        style="padding-top: 0px; padding-bottom: 0px"
                      >
                        <span class="text-h6">{{ col.label }}</span>
                      </q-th>
                    </q-tr>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <template v-for="(cell, key, i) in props.row" :key="i">
                        <q-td v-if="!['uniqueId'].includes(key)" :style="cell.style">
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
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-btn
          flat
          square
          color="primary"
          @click="redirectToInvoicePrint"
          icon="o_print"
          class="border-button rounded-borders"
          style="padding: 6px 3px"
        />
      </div>
    </div>

    <div class="row q-mt-sm" style="gap: 7px">
      <q-expansion-item
        dense
        style="font-weight: bold"
        label="Bill Address"
        class="padding-expansion col-grow"
      >
        <q-card>
          <q-input
            v-model="billAddress"
            label="Note..."
            dense
            outlined
            style="max-height: 200px"
            type="textarea"
          />
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        dense
        style="font-weight: bold"
        label="Comments"
        class="padding-expansion col-grow"
      >
        <q-card>
          <q-input
            v-model="comments"
            label="Note..."
            dense
            outlined
            style="max-height: 200px"
            type="textarea"
          />
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { allObjectsInArray } from 'src/utils/datatype'

export default defineComponent({
  name: 'InvoiceForm',
  setup() {
    const $q = useQuasar()
    return {
      updateQty: ref(''),
      description: ref(''),
      billAdress: ref(''),
      billNumber: ref(),
      reservationResource: ref(),
      arrival: ref(),
      departure: ref(),
      guestName: ref(),
      allObjectsInArray,
      comments: ref(''),
      viewBill: ref(false),
      columns: [
        { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
        { name: 'Description', label: 'Description', align: 'left', field: 'Description' },
        { name: 'Amount', label: 'Amount', align: 'left', field: 'Amount' }
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
      data: [],
      uniqueId: []
    }
  },
  computed: {
    updatedQtyWithDefault: {
      get() {
        return this.updateQty || '-'
      },
      set(value) {
        this.updateQty = value
      }
    }
  },
  mounted() {
    if (this.$ResvStore.uniqueId) {
      this.getDetailForm()
    }

    this.fetchData()
    this.userView()

    // watch(
    //   () => this.$ResvStore.UniqueId,
    //   () => {
    //     this.getDetailForm()
    //   }
    // )
  },
  watch: {
    // Watch for changes in specific properties and call the function when they change
    '$ResvStore.currentResvId': 'getDetailForm',
    '$ResvStore.currentRoomResvId': 'getDetailForm',
    '$ResvStore.dateBill': 'getDetailForm',
    '$ResvStore.Artlb': 'getDetailForm',
    '$ResvStore.UniqueId': 'getDetailForm',
    filterSortOrder: {
      handler(oldFilter, newFilter) {
        Object.keys(this.filterColumns).forEach((key) => {
          if (oldFilter['col'] != key) this.filterColumns[key].data = null
        })
        this.fetchData()
      }
    }
  },
  methods: {
    redirectToInvoicePrint() {
      const { resvId, resvRoomId } = this.$route.params

      this.$router.replace({
        name: 'print-invoice',
        params: { resvId, resvRoomId }
      })
    },
    userView() {
      this.loading = true

      const { resvId, resvRoomId } = this.$route.params

      if (resvId === 0 || resvRoomId === 0) {
        this.loading = false
        console.log(resvId)
        return
      }

      let url = `invoice/${resvId}/${resvRoomId}/print`

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
    },
    setSortOrder(val = '') {
      this.filterSortOrder = null
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    formatCurrency(num = 0) {
      return num.toLocaleString()
    },
    triggerPositive(message) {
      this.$q.notify(
        {
          type: 'positive',
          message: message || 'This is a "positive" type notification.',
          timeout: 1000
        },
        4000
      )
    },
    getDetailForm() {
      const { resvId, resvRoomId } = this.$route.params
      const uniqueId = this.$ResvStore.uniqueId
      console.log(uniqueId)
      this.loading = true
      this.api.get(
        `detail/invoice/${resvId}/${resvRoomId}/?ids=${uniqueId}`,
        ({ status, data }) => {
          this.loading = false

          if (status == 200) {
            this.formatData()
            const { detail } = data

            this.backgroundedTotal = this.formatCurrency(data.total)
            this.backgroundedBalance = this.formatCurrency(data.balance)
            this.description = detail.desc
            this.updateQty = detail.qty
            this.rate = this.formatCurrency(detail.rate)
            this.amount = this.formatCurrency(detail.amount)
            this.balance = `Rp ${this.formatCurrency(data.balance)}`
            this.billAddress = data.address
            this.comments = data.comment
            this.console.log('hallo')
          }
          this.triggerPositive('GET Data Successfully')
        }
      )
    },
    fetchData() {
      this.loading = true

      const { resvId, resvRoomId } = this.$route.params

      if (resvId === 0 || resvRoomId === 0) {
        this.loading = false
        console.log(resvId)
        return
      }

      let url = `fo/invoice/${resvId}/${resvRoomId}?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`

      this.$api
        .get(url)
        .then((response) => {
          this.loading = false

          if (response.status === 200) {
            const { artList } = response.data.data

            this.data2 = artList.map((al) => ({
              name: al.id,
              description: al.description,
              qty: 0
            }))
            // this.uniqueId = response.data.data.invoices.uniqueId
            // console.log(this.uniqueId)
            // this.uniqueId = response.data.data.invoices.uniqueId
            // console.log(response.data.data.invoices.uniqueId)
            this.formatData(response.data.data.invoices)
            this.pagination = {
              page: response.data.data.meta?.currPage,
              rowsNumber: response.data.data.meta?.total,
              rowsPerPage: response.data.data.meta?.perPage
            }
          }
          this.triggerPositive('GET Data Successfully')
        })
        .catch((error) => {
          this.loading = false
          console.error('Error fetching data:', error)
        })
    },
    async editDataInv(row) {
      const { currentResvId, currentRoomResvId, dateBill, uniqueId } = this.$ResvStore
      const data = {
        qty: this.qty
      }
      try {
        await this.api.put(
          `detail/invoice/${currentResvId}/${currentRoomResvId}?ids=${uniqueId}`,
          data,
          ({ status, data }) => {
            this.loading = true

            if (status == 200) {
              this.loading = false
              console.log(data)
              this.triggerPositive('Update Data Successfully')
              // Call setRoomResv with uniqueId after updating data
              this.setRoomResv(uniqueId)
            }
          }
        )
      } catch (error) {
        console.log('Terjadi Kesalahan: ' + error)
      }
    }
  }
})
</script>
