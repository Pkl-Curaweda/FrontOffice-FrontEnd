<template>
  <q-page
    class="column"
    style="
      overflow-y: hidden;
      width: 100%;
      min-width: max-content;
      min-height: calc(100vh - 51.25px);
    "
  >
    <FOMenubar>
      <template #left>
        <div>
          <q-input v-model="searchInput" borderless label="Name" type="search">
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>

        <q-separator vertical />

        <q-btn-dropdown
          flat
          square
          class="text-capitalize date-btn text-black"
          label="TDate - FDate"
          icon="o_event"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" />
          </div>
        </q-btn-dropdown>

        <q-separator vertical />

        <q-btn-dropdown
          flat
          square
          class="text-capitalize text-black"
          label="Display Option"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <q-option-group :options="filterDisplayOptions" type="radio" v-model="filterDisplay" />
        </q-btn-dropdown>
      </template>
      <template #right>
        <q-separator vertical />
        <q-btn flat square color="primary" icon="o_add_home">
          <q-popup-proxy>
            <q-banner>
              <TableAddInvoice />
            </q-banner>
          </q-popup-proxy>
        </q-btn>
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
                <template v-for="(cell,key, i) in props.row" :key="i">
                  <q-td v-if="!['uniqueId'].includes(key)" :style="cell.style">
                    {{ cell.data }}
                  </q-td>
                </template>
                <q-td key="" :props="props" style="width: 10px">
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    @click="setRoomResv(props.row)"
                    style="color: #008444"
                    ><svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 13C8.8 13 9.57 12.93 10.31 12.82L13.22 9.91C11.89 10.59 10 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.13L15.39 7.74C15.57 7.56 15.78 7.42 16 7.3V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.04 3.06 17.72 7 17.97V16.13L7.17 15.96C3.84 15.76 2 14.46 2 14V11.77C3.61 12.55 5.72 13 8 13ZM8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2ZM15.13 10.83L17.17 12.87L11.04 19H9V16.96L15.13 10.83ZM18.85 11.19L17.87 12.17L15.83 10.13L16.81 9.15C17 8.95 17.33 8.95 17.53 9.15L18.85 10.47C19.05 10.67 19.05 11 18.85 11.19Z"
                        fill="#008444"
                      />
                    </svg>
                  </q-btn>
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    style="color: #269861"
                    @click="deleteResv(props.row)"
                    ><svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 10.59V4.5C16 2.29 12.42 0.5 8 0.5C3.58 0.5 0 2.29 0 4.5V14.5C0 16.71 3.59 18.5 8 18.5C8.46 18.5 8.9 18.5 9.33 18.44C9.1129 17.8162 9.00137 17.1605 9 16.5V16.45C8.68 16.5 8.35 16.5 8 16.5C4.13 16.5 2 15 2 14.5V12.27C3.61 13.05 5.72 13.5 8 13.5C8.65 13.5 9.27 13.46 9.88 13.39C10.4127 12.5085 11.1638 11.7794 12.0607 11.2731C12.9577 10.7668 13.9701 10.5005 15 10.5C15.34 10.5 15.67 10.54 16 10.59ZM14 9.95C12.7 10.9 10.42 11.5 8 11.5C5.58 11.5 3.3 10.9 2 9.95V7.14C3.47 7.97 5.61 8.5 8 8.5C10.39 8.5 12.53 7.97 14 7.14V9.95ZM8 6.5C4.13 6.5 2 5 2 4.5C2 4 4.13 2.5 8 2.5C11.87 2.5 14 4 14 4.5C14 5 11.87 6.5 8 6.5ZM19 15.5V17.5H11V15.5H19Z"
                        fill="#269861"
                      />
                    </svg>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
      <template #lower>
        <InvoiceForm />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import { defineComponent, ref, defineAsyncComponent } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import InvoiceForm from './fragments/InvoiceForm.vue'
import { allObjectsInArray } from 'src/utils/datatype'

const TableAddInvoice = defineAsyncComponent(() => import('components/charts/TableAddInvoice.vue'))

export default defineComponent({
  name: 'InvoicePage',
  components: { FOMenubar, MultiPane, InvoiceForm, TableAddInvoice },
  setup() {
    return {
      allObjectsInArray,
      selected: ref([]),
      searchInput: ref(''),
      loading: ref(false),
      datePicker: ref(),
      filterDisplayOptions: [
        { label: 'Artno', value: 'artno' },
        { label: 'Description', value: 'description' }
      ],
      columns: [
        { name: 'Art', label: 'Art', align: 'left', field: 'Art' },
        { name: 'Qty', label: 'Qty', align: 'left', field: 'Qty' },
        { name: 'Description', label: 'Description', align: 'left', field: 'Description' },
        { name: 'Rate', label: 'Rate', align: 'left', field: 'Rate' },
        { name: 'Amount', label: 'Amount', align: 'left', field: 'Amount' },
        { name: 'RmNo', label: 'RmNo', align: 'left', field: 'RmNo' },
        { name: 'RoomBoy', label: 'Room Boy', field: 'RoomBoy', align: 'left' },
        { name: 'VoucherNumber', label: 'Voucher Number', align: 'left', field: 'VoucherNumber' },
        { name: 'BillDate', label: 'BillDate', align: 'left', field: 'BillDate' },
        { name: '', label: '', align: 'center', field: '' }
      ]
    }
  },
  data() {
    return {
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
      },
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
  mounted() {
    this.fetchData()
    // if (this.$ResvStore.currentRoomResvId) {
    //   this.fetchData()
    // }

    // watch(
    //   () => this.$ResvStore.currentRoomResvId,
    //   () => {
    //     this.fetchData()
    //     this.getResvProps()
    //   }
    // )
  },
  watch() {
    searchDesc(this.searchInput)
  },
  watch: {
    filterSortOrder: {
      handler(oldFilter, newFilter) {
        Object.keys(this.filterColumns).forEach((key) => {
          if (oldFilter['col'] != key) this.filterColumns[key].data = null
        })
        this.fetchData()
      }
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        this.fetchData()
      }
    },
    searchInput: {
      handler(newSearchInput) {
        this.searchDesc(newSearchInput)
      },
      immediate: true
    },
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    }
  },
  methods: {
    searchDesc(searchInput) {
      console.log('test' + searchInput)
      if (searchInput != '' || searchInput != null) {
        // Make an API call to search based on searchInput
        this.api.get(`invoice/1/1?search=${searchInput}`, ({ status, data }) => {
          if (status === 200) {
            // Update the data with the search result
            this.formatData(data.invoices)
          } else {
            console.error('Error searching data')
          }
        })
      } else {
        console.log('data kosong')
      }
    },
    setSortOrder(val = '') {
      this.filterSortOrder = null
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    fetchData() {
      this.loading = true

      const { currentResvId, currentRoomResvId } = this.$ResvStore

      if (currentResvId === 0 || currentRoomResvId === 0) {
        this.loading = false
        console.log(currentResvId)
        return
      }

      let url = `/fo/invoice/${currentResvId}/${currentRoomResvId}?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`

      if (this.filterSortOrder.col !== '' && this.filterSortOrder.val !== '') {
        url += `&sort=${this.filterSortOrder.val}`
      }

      // if (this.filterDisplay !== null) {
      //   url += `&disOpt=${this.filterDisplay}`
      // }

      const formattedDate = this.datePicker?.replace(/\//g, '-')

      if (formattedDate) {
        url += `&date=${formattedDate}T${formattedDate}`
      }

      this.$api
        .get(url)
        .then((response) => {
          this.loading = false

          if (response.status === 200) {
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
    formatCurrency(num = 0) {
      return num.toLocaleString()
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
    setRoomResv(data) {
      this.$ResvStore.dateBill = data['BillDate'].data
      this.$ResvStore.Artlb = data['Art'].data
      this.$ResvStore.UniqueId = data['uniqueId'].data
      console.log(data['BillDate'].data)
      console.log(this.$ResvStore.dateBill)
      console.log(this.$ResvStore.UniqueId)
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
    }
  }
})
</script>
