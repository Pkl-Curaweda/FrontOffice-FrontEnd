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
          <q-card>
            <q-card-section class="items-center q-pb-none">
              <div class="row items-center">
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </div>
            </q-card-section>

            <q-card-section>
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
                  <template v-slot:header="props">
                    <q-tr class="table-head" :props="props">
                      <q-th
                        v-for="(col, i) in props.cols"
                        :key="i"
                        style="padding-top: 0px; padding-bottom: 0px"
                      >
                        <q-select
                          v-if="filterColumns.hasOwnProperty(col.name)"
                          clearable
                          borderless
                          dark
                          label-color="white"
                          style="min-width: 90px"
                          v-model="filterColumns[col.name].data"
                          :options="filterColumns[col.name].options"
                          @update:model-value="(val) => filterColumns[col.name].onOptionChange(val)"
                          :label="col.label"
                        >
                          <template
                            v-if="allObjectsInArray(filterColumns[col.name].options)"
                            v-slot:option="scope"
                          >
                            <q-item v-bind="scope.itemProps">
                              <q-item-section>
                                <div class="flex">
                                  <q-icon
                                    size="20px"
                                    v-for="(ic, k) in scope.opt.icons"
                                    :key="k"
                                    :name="ic"
                                  />
                                  <q-item-label class="q-ml-sm">{{ scope.opt.label }}</q-item-label>
                                </div>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                        <span v-else class="text-h6">{{ col.label }}</span>
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
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-btn
          flat
          square
          color="primary"
          to="/fo/guest-invoice/print"
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
      allObjectsInArray,
      comments: ref(''),
      viewBill: ref(false),
      columns: [
        { name: 'Art', label: 'Art', align: 'left', field: 'Art' },
        { name: 'Qty', label: 'Qty', align: 'left', field: 'Qty' },
        { name: 'Description', label: 'Description', align: 'left', field: 'Description' },
        { name: 'Rate', label: 'Rate', align: 'left', field: 'Rate' },
        { name: 'Amount', label: 'Amount', align: 'left', field: 'Amount' },
        { name: 'RmNo', label: 'RmNo', align: 'left', field: 'RmNo' },
        { name: 'RoomBoy', label: 'Room Boy', field: 'RoomBoy', align: 'left' },
        { name: 'VoucherNumber', label: 'Voucher Number', align: 'left', field: 'VoucherNumber' },
        { name: 'BillDate', label: 'BillDate', align: 'left', field: 'BillDate' }
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
      uniqueId: [],
      filterSortOrder: ref({ col: '', val: '' }),
      filterColumns: {
        Art: {
          data: '',
          options: ['1-999', '999-1'],
          onOptionChange: (val) => {
            if (val == '1-999') this.filterSortOrder = { col: 'Art', val: 'art-asc' }
            else if (val == '999-1') this.filterSortOrder = { col: 'Art', val: 'art-desc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Qty: {
          data: '',
          options: ['1>', '1'],
          onOptionChange: (val) => {
            if (val == '1>') this.filterSortOrder = { col: 'Qty', val: 'qty-desc' }
            else if (val == '1') this.filterSortOrder = { col: 'Qty', val: 'qty-asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Description: {
          data: '',
          options: ['A-Z', 'Z-A'],
          onOptionChange: (val) => {
            if (val == 'A-Z') this.filterSortOrder = { col: 'Description', val: 'desc-asc' }
            else if (val == 'Z-A') this.filterSortOrder = { col: 'Description', val: 'desc-desc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Rate: {
          data: '',
          options: ['High Price', 'Low Price'],
          onOptionChange: (val) => {
            if (val == 'High Price') this.filterSortOrder = { col: 'Rate', val: 'rate-desc' }
            else if (val == 'Low Price') this.filterSortOrder = { col: 'Rate', val: 'rate-asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Amount: {
          data: '',
          options: ['High Price', 'Low Price'],
          onOptionChange: (val) => {
            if (val == 'High Price') this.filterSortOrder = { col: 'Amount', val: 'amount-desc' }
            else if (val == 'Low Price') this.filterSortOrder = { col: 'Amount', val: 'amount-asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        // RmNo: {
        //   data: '',
        //   options: ['', '']
        // },
        // RoomBoy: {
        //   data: '',
        //   options: ['ILYAS', 'RONI', 'YUTA', 'HERTIAMAN']
        // },
        // VoucherNumber: {
        //   data: '',
        //   options: ['', '']
        // },
        BillDate: {
          data: '',
          options: ['Newest', 'Oldest'],
          onOptionChange: (val) => {
            if (val == 'Newest') this.filterSortOrder = { col: 'BillDate', val: 'date-desc' }
            else if (val == 'Oldest') this.filterSortOrder = { col: 'BillDate', val: 'date-asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        }
      }
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
    formatData(raw = []) {
      const list = []
      const unique = []

      raw.forEach((inv) => {
        // uniqueId: { data: inv.uniqueId, style: {} }

        list.push({
          Art: { data: inv.art.label ? inv.art.label : inv.art, style: {} },
          Qty: { data: inv.qty, style: {} },
          Description: { data: inv.desc, style: {} },
          Rate: { data: this.formatCurrency(inv.rate), style: {} },
          Amount: { data: this.formatCurrency(inv.amount), style: {} },
          RmNo: { data: 101, style: {} },
          RoomBoy: { data: 'Asep', style: {} },
          VoucherNumber: { data: 101111, style: {} },
          BillDate: { data: inv.billDate, style: {} },
          uniqueId: { data: inv.uniqueId, style: {} }
        })
      })
      console.log(list)
      this.data = list
      // this.uniqueId = unique
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
