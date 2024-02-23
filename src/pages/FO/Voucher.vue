<template>
  <q-page style="min-width: max-content; height: 100%">
    <FOMenubar>
      <template #left>
        <div>
          <q-input v-model="searchInput" borderless label="Voucher Name" type="search">
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
            <q-date v-model="datePicker" range />
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
          <q-popup-proxy :offset="[10, 10]" v-model="isPopupOpen">
            <q-card style="width: 350px" class="q-px-sm q-py-sm">
              <div class="text-h5 q-mt-md">{{ titleVoucher || 'Add Voucher' }}</div>
              <q-input
                dense
                outlined
                v-model="voucherName"
                :readonly="readVoucherName"
                label="Voucher Name"
                class="uppercase col-grow text-bold q-mt-sm"
                mask="AAAAAAAAAAAAAAAA"
              />
              <q-input
                dense
                outlined
                v-model="description"
                label="Description"
                class="q-mt-sm col-grow text-bold"
              />
              <q-input
                dense
                outlined
                v-model="discount"
                label="Discount"
                class="q-mt-sm col-grow text-bold"
                mask="###"
              />
              <q-input outlined dense v-model="input" readonly class="q-mt-sm" label="Expire at">
                <template v-slot:append>
                  <q-icon name="event" color="primary" class="cursor-pointer">
                    <q-popup-proxy>
                      <q-date v-model="input" mask="YYYY-MM-DD" style="width: 300px" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="row q-pt-sm">
                <q-checkbox v-model="complimentary" label="Complimentary" />
                <q-checkbox v-model="houseUse" label="House Use" />
              </div>
              <div
                class="q-pa-sm flex justify-end q-mt-sm"
                style="gap: 5px; border-top: 1px solid green"
              >
                <q-btn size="sm" no-caps outline v-if="!isEditing" @click="clearFields"
                  >Cancel</q-btn
                >
                <q-btn size="sm" no-caps color="primary" text-color="white" @click="saveVoucher">
                  {{ labelButton || 'Add' }}</q-btn
                >
              </div>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </template>
    </FOMenubar>

    <div class="my-table multi-panel q-px-md q-py-sm" style="flex-grow: 1">
      <!-- <q-table
        class="no-shadow"
        :rows="data"
        :loading="loading"
        :columns="columns"
        row-key="name"
        hide-bottom
        :rows-per-page-options="['']"
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
            <q-td key="" :props="props" style="width: 10px">
              <q-btn flat rounded size="13px" @click="editVoucher(props.row)" style="color: #008444"
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
                @click="deleteVoucher(props.row)"
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
      </q-table> -->
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        square
        class="q-px-md"
        :table-header-style="{
          backgroundColor: '#069550',
          color: '#ffffff',
          padding: '9px'
        }"
        :card-style="{ boxShadow: 'none' }"
        rows-per-page-label="Show"
        :rows-per-page-options="[]"
        hide-bottom
        :dense="$q.screen.lt.md"
      >
        <template v-slot:body="props">
          <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
            <q-td key="Voucher Name" :props="props">
              {{ props.row.voucherName }}
            </q-td>
            <q-td key="Expired" :props="props" style="width: 10px">
              {{ props.row.expired }}
            </q-td>
            <q-td key="Description" :props="props">
              {{ props.row.description }}
            </q-td>
            <q-td key="Discount" :props="props">
              {{ props.row.discount }}
            </q-td>
            <q-td key="Complimentary" :props="props" style="width: 10px">
              {{ props.row.complimentary }}
            </q-td>
            <q-td key="House Use" :props="props" style="width: 10px">
              {{ props.row.houseUse }}
            </q-td>
            <q-td key="Action" :props="props" style="width: 10px">
              <q-btn flat rounded size="13px" style="color: #008444" @click="editVoucher(props.row)"
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
                style="color: #008444"
                @click="deleteVoucher(props.row)"
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
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'

export default defineComponent({
  name: 'VoucherPage',
  components: { FOMenubar },
  setup() {
    const voucherName = ref('')
    return {
      columns: [
        { name: 'Voucher Name', label: 'Voucher Name', align: 'left', field: 'voucherName' },
        { name: 'Expired', label: 'Expired', align: 'center', field: 'expired' },
        { name: 'Description', label: 'Description', align: 'left', field: 'description' },
        { name: 'Discount', label: 'Discount', align: 'left', field: 'discount' },
        { name: 'Complimentary', label: 'Complimentary', align: 'center', field: 'compliemntary' },
        { name: 'House Use', label: 'House Use', align: 'center', field: 'houseUse' },
        { name: 'Action', label: 'Action', align: 'center', field: '' }
      ],
      voucherName,
      description: ref(),
      discount: ref(),
      expireAt: ref(),
      complimentary: ref(false),
      houseUse: ref(false),
      input: ref(''),
      date: ref(''),
      rows: ref(),
      searchInput: ref(''),
      datePicker: ref({ from: '', to: '' }),
      titleVoucher: ref(),
      isPopupOpen: ref(false),
      labelButton: ref(),
      readVoucherName: ref(false)
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice')
    }
  },
  mounted() {
    this.fetchData()
  },
  watch() {
    searchVouhcer(this.searchInput)
  },
  watch: {
    searchInput: {
      handler(newValue) {
        this.searchVouhcer(newValue)
      },
      immediate: true
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        this.fetchData()
      }
    }
  },
  methods: {
    searchVouhcer(searchInput) {
      this.searchData = searchInput
      this.fetchData()
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'error unknown action try again',
          timeout: 1000
        },
        1000
      )
    },
    saveVoucher() {
      if (this.labelButton === 'Edit') {
        this.updateVoucher()
      } else {
        this.addVoucher()
      }
    },
    addVoucher() {
      if (this.discount > 100) {
        this.$q.notify(
          {
            type: 'negative',
            message: 'Can set discount many than 100',
            timeout: 1000
          },
          1000
        )
      }
      const data = {
        voucherName: this.voucherName,
        description: this.description,
        discount: parseInt(this.discount),
        complimentary: this.complimentary,
        houseUse: this.houseUse,
        expireAt: new Date(this.input)
      }
      if(this.input === null) data.expireAt = null

      let url = `voucher/add`

      this.api.post(url, data, ({ status, message }) => {
        if (status === 200) {
          this.trigger('possitive', message)
          this.clearFields()
          this.fetchData()
        }
      })
    },
    updateVoucher() {
      const data = {
        voucherName: this.voucherName,
        description: this.description,
        discount: parseInt(this.discount),
        complimentary: this.complimentary,
        houseUse: this.houseUse,
        expireAt: new Date(this.input)
      }
      if(this.input === null) data.expireAt = null

      let url = `voucher`

      this.api.post(url, data, ({ status, message }) => {
        if (status === 200) {
          this.trigger('possitive', message)
          this.fetchData()
        }
      })
    },
    clearFields() {
      this.labelButton = ''
      this.voucherName = ''
      this.description = ''
      this.discount = ''
      this.readVoucherName = false
      this.complimentary = false
      this.houseUse = false
      this.input = ''
      this.titleVoucher = ''
    },
    editVoucher(row) {
      const voucherName = row.voucherName
      this.isPopupOpen = true
      this.labelButton = 'Edit'
      this.titleVoucher = 'Edit Voucher'
      this.readVoucherName = true
      this.editingRow = row

      let url = `voucher/${voucherName}`

      this.api.get(url, ({ data, status, message }) => {
        if (status == 200) {
          this.voucherName = data.voucherName
          this.description = data.description
          this.discount = data.discount
          this.complimentary = data.complimentary
          this.houseUse = data.houseUse
          this.input = data.expireAt
        }
        this.trigger('possitive', message)
      })
    },
    deleteVoucher(row) {
      const voucherName = row.voucherName
      let url = `voucher/${voucherName}`

      this.api.delete(url, ({ status, message }) => {
        if (status == 200) {
          this.trigger('possitive', message)
          this.fetchData()
        }
      })
    },
    fetchData() {
      this.loading = true
      let url = `voucher?search=${this.searchData}`

      const fromDate = this.datePicker != null ? this.datePicker.from.replace(/\//g, '-') : ''
      const toDate = this.datePicker != null ? this.datePicker.to.replace(/\//g, '-') : ''

      if (fromDate !== '' && toDate !== '') {
        url += `&date=${fromDate}T${toDate}`
      }

      console.log(this.isPopupOpen)

      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          this.rows = data.map((vc) => ({
            voucherName: vc.voucherName,
            expired: vc.expireAt,
            description: vc.description,
            discount: vc.discount,
            complimentary: vc.complimentary,
            houseUse: vc.houseUse
          }))
        }
      })
    }
  }
})
</script>
