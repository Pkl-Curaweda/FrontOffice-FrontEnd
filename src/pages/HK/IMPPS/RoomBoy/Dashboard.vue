<template>
  <div class="rb full-width">
    <UserGreet class="q-mt-md q-px-md" name="Aldi Rahadian" role="Room Boy" />
    <div class="q-mt-md q-pl-md">
      <!-- <IMPPSSelectedTable
        :rows="rows"
        :columns="columns"
        title="Task Queue"
        class="no-shadow"
        @getTableData="getTableData"
        isSelect
        :btnEdit="false"
        hidePagination
      /> -->
      <div class="my-table">
        <q-table
          class="no-shadow"
          v-model:pagination="pagination"
          @request="onPaginationChange"
          :rows="data"
          :loading="loading"
          :columns="columns"
          hide-bottom
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
import { defineComponent, ref } from 'vue'

const rows = ref([
  // {
  //   roomNo: '101',
  //   RoomType: 'DLX',
  //   Schedule: '07.00 - 07.40',
  //   Standard: '40 Minute',
  //   Actual: '45 Minute',
  //   Remarks: 'Kamar berantakan',
  //   Status: 'Re-clean',
  //   Comments: 'Sprei masih kotor'
  // },
  // {
  //   roomNo: '102',
  //   RoomType: 'DLX',
  //   Schedule: '07.45 - 08.00',
  //   Standard: '40 Minute',
  //   Actual: '45 Minute',
  //   Remarks: '-',
  //   Status: 'clean',
  //   Comments: 'Sprei masih kotor'
  // },
  // {
  //   roomNo: '103',
  //   RoomType: 'DLX',
  //   Schedule: '07.00 - 07.40',
  //   Standard: '40 Minute',
  //   Actual: '45 Minute',
  //   Remarks: 'Kamar berantakan',
  //   Status: 'Re-clean',
  //   Comments: 'Sprei masih kotor'
  // },
  // {
  //   roomNo: '104',
  //   RoomType: 'DLX',
  //   Schedule: '07.00 - 07.40',
  //   Standard: '40 Minute',
  //   Actual: '45 Minute',
  //   Remarks: 'Kamar berantakan',
  //   Status: 'Re-clean',
  //   Comments: 'Sprei masih kotor'
  // },
  // {
  //   roomNo: '105',
  //   RoomType: 'DLX',
  //   Schedule: '07.00 - 07.40',
  //   Standard: '40 Minute',
  //   Actual: '45 Minute',
  //   Remarks: 'Kamar berantakan',
  //   Status: 'Re-clean',
  //   Comments: 'Sprei masih kotor'
  // }
])

export default defineComponent({
  name: 'DashboardRBPage',
  components: {
    UserGreet
  },
  setup() {
    return {
      data: ref([]),
      columns: [
        {
          name: 'roomNo',
          label: 'Room No',
          align: 'left',
          field: 'roomNo'
        },
        { name: 'RoomType', label: 'Room Type', align: 'left', field: 'RoomType' },
        { name: 'Schedule', label: 'Schedule', align: 'left', field: 'Schedule' },
        { name: 'Standard', label: 'Standard', align: 'left', field: 'Standard' },
        { name: 'Actual', label: 'Actual', align: 'left', field: 'Actual' },
        { name: 'Remarks', label: 'Remarks', align: 'left', field: 'Remarks' },
        { name: 'Status', label: 'Status', align: 'center', field: 'Status' },
        { name: 'Comments', label: 'Comments', align: 'center', field: 'Comments' }
      ],
      selected: []
    }
  },
  data() {
    return {
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
      this.loading = true

      let url = `impps/roomboy/3`
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { listTask } = data
          console.log(listTask)
          this.data = listTask.map((lt) => ({
            roomNo: { data: lt.roomNo, style: {} },
            RoomType: { data: lt.roomType, style: {} },
            Schedule: { data: lt.schedule, style: {} },
            Standard: { data: lt.standard, style: {} },
            Actual: { data: lt.actual, style: {} },
            Remarks: { data: lt.remarks, style: {} },
            Status: { data: lt.status, style: {} },
            Comments: { data: lt.comments, style: {} }
          }))
          console.log(this.data)
          // this.rows = listTask.map((lt) => ({
          //   roomNo: lt.roomNo,
          //   RoomType: lt.roomType,
          //   Schedule: lt.schedule,
          //   Standard: lt.standard,
          //   Actual: lt.actual,
          //   Remarks: lt.remarks,
          //   Status: lt.status,
          //   Comments: lt.comments
          // }))
        }
      })
    }
    // formatData(raw = []) {
    //   console.log(raw)
    //   const list = []
    //   console.log(list)

    //   raw.foreach((lt) => {
    //     list.push({
    //       roomNo: { data: lt.roomNo, style: {} },
    //       RoomType: { data: lt.roomType, style: {} },
    //       Schedule: { data: lt.schedule, style: {} },
    //       Standard: { data: lt.standard, style: {} },
    //       Actual: { data: lt.actual, style: {} },
    //       Remarks: { data: lt.remarks, style: {} },
    //       Status: { data: lt.status, style: {} },
    //       Comments: { data: lt.comments, style: {} }
    //     })
    //   })
    //   this.data = list
    //   console.log(this.data)
    // }
  }
})
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
