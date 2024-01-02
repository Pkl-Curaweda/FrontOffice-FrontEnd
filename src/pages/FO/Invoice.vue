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
        <q-chip>Left side</q-chip>
      </template>
      <template #right>
        <q-chip>right side</q-chip>
      </template>
    </FOMenubar>

    <MultiPane>
      <template #upper>
        <div class="my-table">
          <q-table class="no-shadow" :rows="rows" :columns="columns" row-key="name">
            <template v-slot:header="props">
              <q-tr class="table-head" :props="props">
                <q-th
                  v-for="(col, i) in props.cols"
                  :key="i"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <q-select
                    v-if="filterCols.hasOwnProperty(col.name)"
                    clearable
                    borderless
                    dark
                    label-color="white"
                    style="min-width: 90px"
                    v-model="filterCols[col.name].data"
                    :options="filterCols[col.name].options"
                    :label="col.label"
                  >
                    <template
                      v-if="allObjectsInArray(filterCols[col.name].options)"
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
                <q-td v-for="(cell, i) in props.row" :key="i" :style="cell.style">
                  {{ cell.data }}
                </q-td>
                <q-td key="" :props="props" style="width: 10px">
                  <q-btn flat rounded size="13px" style="color: #008444"
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
                  <q-btn flat rounded size="13px" style="color: #269861"
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
import { defineComponent } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import InvoiceForm from './fragments/InvoiceForm.vue'
import { allObjectsInArray } from 'src/utils/datatype'

const columns = [
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

const filterCols = {
  Art: {
    data: '',
    options: ['1-999', '999-1']
  },
  Qty: {
    data: '',
    options: ['1', '>1']
  },
  Description: {
    data: '',
    options: ['1-999', '999-1', 'A-Z', 'Z-A']
  },
  Rate: {
    data: '',
    options: ['High Price', 'Low Price']
  },
  Amount: {
    data: '',
    options: ['High Price', 'Low Price']
  },
  RmNo: {
    data: '',
    options: ['', '']
  },
  RoomBoy: {
    data: '',
    options: ['ILYAS', 'RONI', 'YUTA', 'HERTIAMAN']
  },
  VoucherNumber: {
    data: '',
    options: ['', '']
  },
  BillDate: {
    data: '',
    options: ['Newest', 'Oldest']
  }
}

const rows = [
  {
    Art: { data: '115', style: {} },
    Qty: { data: '1', style: {} },
    Description: { data: 'Blanket', style: { backgroundColor: '' } },
    Rate: { data: 'Rp 30,000.00', style: {} },
    Amount: { data: 'Rp 30,000.00', style: {} },
    RmNo: { data: '101', style: {} },
    RoomBoy: { data: 'Yanto', style: {} },
    VoucherNumber: { data: '19', style: {} },
    BillDate: { data: '12/02/23', style: {} }
  },
  {
    Art: { data: '114', style: {} },
    Qty: { data: '2', style: {} },
    Description: { data: 'Pillow', style: { backgroundColor: '' } },
    Rate: { data: 'Rp 10,000.00', style: {} },
    Amount: { data: 'Rp 20,000.00', style: {} },
    RmNo: { data: '101', style: {} },
    RoomBoy: { data: 'Luthfi', style: {} },
    VoucherNumber: { data: '20', style: {} },
    BillDate: { data: '12/02/23', style: {} }
  },
  {
    Art: { data: 'In Room', style: {} },
    Qty: { data: '', style: {} },
    Description: { data: 'Nasi Goreng', style: { backgroundColor: '' } },
    Rate: { data: 'Rp 541,027.00', style: {} },
    Amount: { data: 'Rp 541,027.00', style: {} },
    RmNo: { data: '101', style: {} },
    RoomBoy: { data: '103', style: {} },
    VoucherNumber: { data: '103', style: {} },
    BillDate: { data: '12/02/23', style: {} }
  },
  {
    Art: { data: '1', style: {} },
    Qty: { data: '1', style: {} },
    Description: { data: 'Breakfast', style: { backgroundColor: '' } },
    Rate: { data: 'Rp 541,027.00', style: {} },
    Amount: { data: 'Rp 541,027.00', style: {} },
    RmNo: { data: '101', style: {} },
    RoomBoy: { data: '102', style: {} },
    VoucherNumber: { data: '103', style: {} },
    BillDate: { data: '13/02/23', style: {} }
  },
  {
    Art: { data: '', style: {} },
    Qty: { data: '', style: {} },
    Description: { data: '', style: { backgroundColor: '' } },
    Rate: { data: '', style: {} },
    Amount: { data: '', style: {} },
    RmNo: { data: '', style: {} },
    RoomBoy: { data: '', style: {} },
    VoucherNumber: { data: '', style: {} },
    BillDate: { data: '', style: {} }
  },
  {
    Art: { data: '', style: {} },
    Qty: { data: '', style: {} },
    Description: { data: '', style: { backgroundColor: '' } },
    Rate: { data: '', style: {} },
    Amount: { data: '', style: {} },
    RmNo: { data: '', style: {} },
    RoomBoy: { data: '', style: {} },
    VoucherNumber: { data: '', style: {} },
    BillDate: { data: '', style: {} }
  },
  {
    Art: { data: '', style: {} },
    Qty: { data: '', style: {} },
    Description: { data: '', style: { backgroundColor: '' } },
    Rate: { data: '', style: {} },
    Amount: { data: '', style: {} },
    RmNo: { data: '', style: {} },
    RoomBoy: { data: '', style: {} },
    VoucherNumber: { data: '', style: {} },
    BillDate: { data: '', style: {} }
  },
  {
    Art: { data: '', style: {} },
    Qty: { data: '', style: {} },
    Description: { data: '', style: { backgroundColor: '' } },
    Rate: { data: '', style: {} },
    Amount: { data: '', style: {} },
    RmNo: { data: '', style: {} },
    RoomBoy: { data: '', style: {} },
    VoucherNumber: { data: '', style: {} },
    BillDate: { data: '', style: {} }
  },
  {
    Art: { data: '', style: {} },
    Qty: { data: '', style: {} },
    Description: { data: '', style: { backgroundColor: '' } },
    Rate: { data: '', style: {} },
    Amount: { data: '', style: {} },
    RmNo: { data: '', style: {} },
    RoomBoy: { data: '', style: {} },
    VoucherNumber: { data: '', style: {} },
    BillDate: { data: '', style: {} }
  }
]

export default defineComponent({
  name: 'InvoicePage',
  components: { FOMenubar, MultiPane, InvoiceForm },
  data() {
    return {
      filterCols,
      rows,
      columns,
      allObjectsInArray
    }
  },
  watch: {
    filterCols: {
      handler(filters) {
        console.log(filters)
      },
      deep: true
    }
  }
})
</script>
