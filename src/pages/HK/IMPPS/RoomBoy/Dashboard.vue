<template>
  <div class="rb full-width">
    <UserGreet class="q-mt-md q-px-md" name="Aldi Rahadian" role="Room Boy" />
    <div class="q-mt-md q-pa-md">
      <!-- <div class="my-table" style="max-height: fit-content; overflow: auto">
        <q-table class="no-shadow" :rows="data" :columns="columns" row-key="name" hidePagination>
          <template>
            <q-tr class="table-head">
              <q-th style="padding-top: 0px; padding-bottom: 0px">
                <template v-slot:header="props">
                  <q-tr class="table-head" :props="props">
                    <q-th
                      v-for="(col, i) in props.cols.label"
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
                  {{ cell.data.data }}
                  <q-popup-edit v-if="cell.data.data" v-model="props.row.name" title="" auto-save>
                    <q-list style="align-content: flex-end; width: 100%">
                      <q-item
                        clickable
                        v-close-popup
                        @click="getDetailform(cell.data.resvId, cell.data.resvRoomId)"
                        style="display: flex; padding: 5px; border-radius: 30px"
                      >
                        <q-item-section>
                          <q-item-label style="color: black" class="font-bold">{{
                            cell.data.data ? cell.data.data : ''
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list></q-popup-edit
                  >
                </q-td>
              </template>
            </q-tr>
          </template>
        </q-table>
      </div> -->
      <IMPPSSelectedTable
        :rows="data"
        :columns="columns"
        title="Task Queue"
        @getTableData="getTableData"
        isSelect
        :btnEdit="false"
        hidePagination
      >
        <q-popup-edit v-if="cell.data.label" v-model="props.row.name" title="" auto-save>
          <q-list style="align-content: flex-end; width: 100%">
            <q-item
              clickable
              v-close-popup
              @click="getDetailform(cell.data.resvId, cell.data.resvRoomId)"
              style="display: flex; padding: 5px; border-radius: 30px"
            >
              <q-item-section>
                <q-item-label style="color: black" class="font-bold">{{
                  cell.data.label ? cell.data.label : ''
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list></q-popup-edit
        >
      </IMPPSSelectedTable>
    </div>
    <q-form class="q-mt-lg q-mx-auto" style="width: 242px; min-width: 200px">
      <div class="row items-center justify-between full-width">
        <q-btn
          dense
          noCaps
          label="Start"
          class="rb-btn rb-drop-shadow q-py-none text-body1"
          style="border-radius: 8px"
          color="primary"
        />
        <q-btn
          dense
          noCaps
          label="End"
          class="rb-btn rb-drop-shadow q-py-none text-body1"
          style="border-radius: 8px"
          color="negative"
        />
      </div>
      <div class="q-mt-lg row items-center justify-center">
        <div>
          <div>Remarks</div>
          <q-input filled dense placeholder="Notes..." class="rb-input" type="textarea" />
        </div>
      </div>
      <div class="row items-center justify-end q-mt-sm">
        <q-btn
          dense
          class="text-body1 q-px-md q-py-none"
          label="Submit"
          type="submit"
          color="primary"
          noCaps
          style="border-radius: 8px"
        />
      </div>
      <div class="q-mt-lg">
        <q-btn
          class="text-body1 rb-drop-shadow q-px-md q-py-none"
          label="Lost and Found Report"
          icon="sym_o_nest_found_savings"
          color="primary"
          noCaps
          style="border-radius: 8px; height: 55px"
          to="/hk/rb/lostfound"
        />
      </div>
    </q-form>
    <div class="performance q-mt-xl">
      <div class="row items-center justify-center">
        <div class="bg-black q-pa-sm" style="border-radius: 5px">
          <q-icon name="sym_o_earthquake" color="white" size="20px" />
        </div>
        <div class="text-black text-h6 text-weight-bold q-pl-sm">Performance</div>
      </div>
      <div class="row items-center justify-center q-mt-xs q-gutter-md">
        <q-icon name="star" color="yellow-7" size="50px" />
        <q-icon name="star" color="yellow-7" size="50px" />
        <q-icon name="star" color="yellow-7" size="50px" />
        <q-icon name="star" color="yellow-7" size="50px" />
        <q-icon name="star" color="yellow-7" size="50px" />
      </div>
    </div>
  </div>
</template>

<script>
import UserGreet from 'src/components/HK/IMPPS/General/UserGreet.vue'
import IMPPSSelectedTable from 'src/components/HK/IMPPS/Table/SelectedTable.vue'

const columns = [
  {
    name: 'roomNo',
    required: true,
    label: 'Room No',
    align: 'left',
    field: (row) => row.roomNo,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'RoomType',
    required: true,
    label: 'Room Type',
    align: 'left',
    format: (val) => `${val}`,
    field: (row) => row.roomType
  },
  {
    name: 'Schedule',
    label: 'Schedule',
    align: 'left',
    field: (row) => row.schedule,
    style: (row) => row.rowColor
  },
  {
    name: 'Standard',
    label: 'Standard',
    align: 'left',
    field: (row) => row.standard,
    style: (row) => row.rowColor
  },
  {
    name: 'Actual',
    label: 'Actual',
    align: 'left',
    field: (row) => row.actual,
    style: (row) => row.rowColor
  },
  {
    name: 'Remarks',
    label: 'Remarks',
    align: 'left',
    field: (row) => row.remarks,
    style: (row) => row.rowColor
  },
  {
    name: 'Status',
    label: 'Status',
    align: 'left',
    field: (row) => row.status,
    style: (row) => row.rowColor
  },
  {
    name: 'Comments',
    label: 'Comments',
    align: 'left',
    field: (row) => row.comments,
    style: (row) => row.rowColor
  }
]

const rows = [
  {
    roomNo: '101',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Status: 'Re-clean',
    Comments: 'Sprei masih kotor'
  },
  {
    roomNo: '102',
    RoomType: 'DLX',
    Schedule: '07.45 - 08.00',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: '-',
    Status: 'clean',
    Comments: 'Sprei masih kotor'
  },
  {
    roomNo: '103',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Status: 'Re-clean',
    Comments: 'Sprei masih kotor'
  },
  {
    roomNo: '104',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Status: 'Re-clean',
    Comments: 'Sprei masih kotor'
  },
  {
    roomNo: '105',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Status: 'Re-clean',
    Comments: 'Sprei masih kotor'
  }
]
const data = []
export default {
  name: 'DashboardRBPage',
  components: {
    UserGreet,
    IMPPSSelectedTable
  },
  data() {
    return {
      rows,
      columns,
      selected: [],
      data,
      api: new this.$Api('impps')
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    getTableData(data) {
      this.selected = data
    },
    fetchData() {
      try {
        this.api.get(`roomboy/3`, ({ data, status, message }) => {
          if (status === 200) {
            const { listTask } = data
            this.trigger('positive', message)
            // this.formatData(data.listTask)
            console.log(listTask)
            this.data = listTask
          } else {
            this.trigger('waring', message)
          }
        })
      } catch (error) {
        console.error(error)
      }
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
    },
    formatData(raw = []) {
      const list = []

      raw.forEach((lt) => {
        console.log(lt)
        list.push({
          taskId: { data: lt.taskId, style: {} },
          roomNo: { data: lt.roomNo, style: {} },
          roomType: { data: lt.roomType, style: {} },
          standard: { data: lt.standard, style: {} },
          actual: { data: lt.actual, style: {} },
          remarks: { data: lt.remarks, style: {} },
          status: { data: lt.status, style: {} },
          comments: { data: lt.comments, style: {} }
        })
      })
      this.data = list
      console.log(this.data)
    },
    refreshData() {
      window.location.reload()
    }
  }
}
</script>

<style>
.rb .rb-btn {
  width: 45%;
  min-width: 100px;
}
.rb .rb-drop-shadow {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) !important;
}
.rb .q-field--dense .q-field__control {
  width: 242px !important;
  min-width: 200px;
  height: 100px !important;
  border-radius: 8px;
  background: white;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
}
.rb .rb-input textarea {
  resize: none;
}
.performance {
  width: fit-content;
  min-width: 242px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  padding: 16px;
  border: 1px solid black;
  border-radius: 8px;
}
</style>
