<template>
  <q-page
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
      </template>
      <template #right>
        <q-separator vertical />
        <q-btn flat square color="primary">
          <q-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
            >
              <path
                d="M16 10.09V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.21 3.59 18 8 18C8.46 18 8.9 18 9.33 17.94C9.1129 17.3162 9.00137 16.6605 9 16V15.95C8.68 16 8.35 16 8 16C4.13 16 2 14.5 2 14V11.77C3.61 12.55 5.72 13 8 13C8.65 13 9.27 12.96 9.88 12.89C10.4127 12.0085 11.1638 11.2794 12.0607 10.7731C12.9577 10.2668 13.9701 10.0005 15 10C15.34 10 15.67 10.04 16 10.09ZM14 9.45C12.7 10.4 10.42 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.45ZM8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6ZM19 15V17H16V20H14V17H11V15H14V12H16V15H19Z"
                fill="#008444"
              />
            </svg>
          </q-icon>
          <q-popup-proxy :offset="[10, 10]">
            <q-card>
              <div class="my-table" style="max-height: 400px; overflow: auto">
                <q-table
                  flat
                  bordered
                  :rows="data2"
                  :columns="columns2"
                  row-key="name"
                  selection="multiple"
                  v-model:selected="selected"
                >
                  <template #body-cell-qty="props">
                    <q-td :props="props">
                      <q-btn
                        class="q-pa-xs bg-primary"
                        style="height: 100%"
                        text-color="white"
                        size="sm"
                        @click="decrementQty(props.row)"
                        icon="remove"
                        flat
                      ></q-btn>
                      <span
                        class="q-ma-xs q-pa-sm"
                        style="border: 1px solid gray; border-radius: 3px"
                        >{{ props.value }}</span
                      >
                      <q-btn
                        class="q-pa-xs bg-primary"
                        style="height: 100%"
                        text-color="white"
                        size="sm"
                        @click="incrementQty(props.row)"
                        icon="add"
                        flat
                      ></q-btn>
                    </q-td>
                  </template>
                </q-table>
              </div>
              <div class="q-pa-sm flex justify-end" style="gap: 5px; border-top: 1px solid green">
                <q-btn size="sm" no-caps outline>Cancel</q-btn>
                <q-btn
                  size="sm"
                  no-caps
                  color="primary"
                  text-color="white"
                  @click="handleAddArticles"
                  >Add</q-btn
                >
              </div>
            </q-card>
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
            :rows-per-page-options="[1, 5, 7, 10, 15, 20, 25, 30]"
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
                  <q-td
                    v-if="!['uniqueId'].includes(key)"
                    :style="cell.style"
                    @click="setRoomResv(props.row)"
                  >
                    {{ cell.data }}
                  </q-td>
                </template>
                <q-td key="" :props="props" style="width: 10px">
                  <!-- <q-btn
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
                  </q-btn> -->
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    style="color: #269861"
                    @click="removeInvoiceData(props.row)"
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
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import InvoiceForm from './fragments/InvoiceForm.vue'
import { allObjectsInArray } from 'src/utils/datatype'

const columns2 = [
  {
    name: 'art',
    required: true,
    label: 'Art',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'description',
    align: 'center',
    label: 'Description',
    field: 'description',
    sortable: true
  },
  { name: 'qty', align: 'center', label: 'Qty', field: 'qty', sortable: true }
]

const data2 = ref([]) //

export default defineComponent({
  name: 'InvoicePage',
  components: { FOMenubar, MultiPane, InvoiceForm },
  setup() {
    const postedArticles = ref([])
    const selected = ref([])
    return {
      columns2,
      postedArticles,
      selected,
      allObjectsInArray,
      data2,
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
        { name: '', label: 'Action', align: 'center', field: '' }
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
        RmNo: {
          data: '',
          options: ['101-110', '110-101'],
          onOptionChange: (val) => {
            if (val == '101-110') this.filterSortOrder = { col: 'RmNo', val: 'room-asc' }
            else if (val == '110-101') this.filterSortOrder = { col: 'RmNo', val: 'room-desc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
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
    // if (this.$ResvStore.resvRoomId) {
    //   this.fetchData()
    // }

    // watch(
    //   () => this.$ResvStore.resvRoomId,
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
    handleAddArticles() {
      // Panggil fungsi untuk menambahkan artikel
      this.addArticles()

      // Panggil fungsi untuk menyegarkan data
      // this.refreshData()
    },
    refreshData() {
      window.location.reload()
    },
    // Fungsi untuk menangani POST request
    addArticles() {
      const { resvId, resvRoomId } = this.$route.params

      if (resvId === 0 || resvRoomId === 0) {
        this.loading = false
        console.log(resvId)
        return
      }

      // Mengumpulkan data yang harus dikirim ke API
      const postData = this.data2
        .filter((al) => al.qty > 0 && this.selected.includes(al)) // Include items with qty > 0 and are selected
        .map((al) => ({
          articleId: al.name,
          qty: al.qty
        }))

      if (postData.length === 0) {
        // No articles selected, handle it accordingly
        console.warn('No articles selected for posting.')
        return
      }

      // Melakukan POST ke API
      this.api.post(`invoice/${resvId}/${resvRoomId}/article`, postData, ({ status, data }) => {
        if (status === 200) {
          // Sukses, Update the reactive variable
          // this.refreshData()
          this.postedArticles.value = [...this.postedArticles.value, ...postData]

          this.$q.notify({
            type: 'positive',
            message: 'Articles added successfully.',
            timeout: 1000
          })
        }
      })
    },
    removeInvoiceData(row) {
      const uniqueId = row.uniqueId.data // Assuming the uniqueId is accessible in your row object
      const { resvId, resvRoomId } = this.$route.params

      if (resvId === 0 || resvRoomId === 0) {
        this.loading = false
        console.log(resvId)
        return
      }

      // Make the DELETE request to the API endpoint
      this.$api
        .delete(`fo/detail/invoice/${resvId}/${resvRoomId}/delete?ids=${uniqueId}`)
        .then((response) => {
          if (response.status === 200 && response.data.success) {
            // If deletion is successful, remove the row from the local data array
            const index = this.data.findIndex((item) => item.uniqueId.data === uniqueId)
            if (index !== -1) {
              this.data.splice(index, 1)
            }

            this.$q.notify({
              type: 'positive',
              message: 'Row deleted successfully.',
              timeout: 1000
            })
          } else {
            console.error('Failed to delete row:', response.data.message)
          }
        })
        .catch((error) => {
          console.error('Error deleting row:', error)
        })
    },
    searchDesc(searchInput) {
      const { resvId, resvRoomId } = this.$route.params

      if (resvId === 0 || resvRoomId === 0) {
        this.loading = false
        console.log(resvId)
        return
      }

      console.log('test' + searchInput)
      if (searchInput != '' || searchInput != null) {
        // Make an API call to search based on searchInput
        this.api.get(
          `invoice/${resvId}/${resvRoomId}?search=${searchInput}`,
          ({ status, data }) => {
            if (status === 200) {
              // Update the data with the search result
            } else {
              console.error('Error searching data')
            }
          }
        )
      } else {
        console.log('data kosong')
      }
    },
    setSortOrder(val = '') {
      this.filterSortOrder = null
    },
    incrementQty(row) {
      row.qty++
    },
    decrementQty(row) {
      if (row.qty > 0) {
        row.qty--
      }
    },
    onPaginationChange(props) {
      props.pagination.rowsPerPage =
      props.pagination.rowsPerPage < 1 ? 50 : props.pagination.rowsPerPage
      console.log(props)
      console.log(props.rowsPerPage)
      this.pagination = props.pagination
      this.fetchData()
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

      if (this.filterSortOrder.col !== '' && this.filterSortOrder.val !== '') {
        url += `&sort=${this.filterSortOrder.val}`
      }

      const formattedDate = this.datePicker != null ? this.datePicker?.replace(/\//g, '-') : ''

      if (formattedDate) {
        url += `&date=${formattedDate}T${formattedDate}`
      }

      this.$api
        .get(url)
        .then((response) => {
          this.loading = false

          if (response.status === 200) {
            const { added, invoices, artList } = response.data.data

            this.data2 = artList.map((inv) => ({
              name: inv.id,
              description: inv.description,
              qty: 0
            }))
            this.trigger('positive',response.data.message)
            this.formatData({ added, invoices })
            this.pagination = {
              page: response.data.data.meta?.currPage,
              rowsNumber: response.data.data.meta?.total,
              rowsPerPage: response.data.data.meta?.perPage
            }
          }
        })
        .catch((error) => {
          this.loading = false
          console.error('Error fetching data:', error)
        })
    },

    formatData({ added, invoices }) {
      const list = []

      invoices.forEach((inv) => {
        list.push({
          Art: {
            data: inv.art.label ? inv.art.label : inv.art,
            style: { backgroundColor: inv.rowColor }
          },
          Qty: { data: inv.qty, style: { backgroundColor: inv.rowColor } },
          Description: { data: inv.desc, style: { backgroundColor: inv.rowColor } },
          Rate: { data: inv.rate, style: { backgroundColor: inv.rowColor } },
          Amount: { data: inv.amount, style: { backgroundColor: inv.rowColor } },
          RmNo: { data: inv.roomNo, style: { backgroundColor: inv.rowColor } }, // Akses rmNo dari objek added
          RoomBoy: { data: added.roomBoys, style: { backgroundColor: inv.rowColor } }, // Akses roomBoy dari objek added
          VoucherNumber: { data: added.voucherNo, style: { backgroundColor: inv.rowColor } }, // Akses voucherNumber dari objek added
          BillDate: { data: inv.billDate, style: { backgroundColor: inv.rowColor } },
          uniqueId: { data: inv.uniqueId, style: {} }
        })
      })

      console.log(list)
      this.data = list
    },
    setRoomResv(data) {
      this.$ResvStore.dateBill = data['BillDate'].data
      this.$ResvStore.Artlb = data['Art'].data
      this.$ResvStore.uniqueId = data.uniqueId.data
      console.log(data['BillDate'].data)
      console.log(this.$ResvStore.dateBill)
      console.log(this.$ResvStore.UniqueId)
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'data not found',
          timeout: 1000
        },
        1000
      )
    }
  }
})
</script>

<style>
.text-h6 {
  font-size: 1rem;
}
</style>
