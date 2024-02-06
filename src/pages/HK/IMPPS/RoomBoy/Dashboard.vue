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
                <q-td
                  :style="cell.style"
                  @click="dialogalert(props.row)"
                  v-if="!['taskId'].includes(key)"
                >
                  {{ cell.data }}
                </q-td>
              </template>
            </q-tr>
          </template>
        </q-table>
        <q-dialog v-model="dialog" persistent>
          <q-card>
            <div align="center" class="q-pa-sm">{{ this.roomNo }}</div>
            <q-card-actions align="right">
              <q-btn flat label="Ok" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <q-form class="q-mt-lg q-mx-auto" style="width: 242px; min-width: 200px">
      <div class="row items-center justify-between full-width">
        <q-btn
          dense
          noCaps
          label="Start"
          @click="Start"
          class="rb-btn rb-drop-shadow q-py-none text-body1"
          style="border-radius: 8px"
          color="primary"
        />
        <q-btn
          dense
          noCaps
          label="End"
          @click="Stop"
          class="rb-btn rb-drop-shadow q-py-none text-body1"
          style="border-radius: 8px"
          color="negative"
        />
      </div>
      <div class="q-mt-lg row items-center justify-center">
        <div>
          <div>Comments</div>
          <q-input
            filled
            dense
            placeholder="Notes..."
            class="rb-input"
            type="textarea"
            v-model="comments"
          />
        </div>
      </div>
      <div class="row items-center justify-end q-mt-sm">
        <q-btn
          dense
          noCaps
          class="rb-btn rb-drop-shadow q-py-none text-body1"
          style="border-radius: 8px"
          label="Submit"
          color="primary"
          @click="SubmitData"
        />
      </div>
      <div class="q-mt-lg">
        <q-btn
          class="text-body1 rb-drop-shadow q-px-md q-py-none"
          label="Lost and Found Report"
          icon="sym_o_nest_found_savings"
          color="primary"
          to="/hk/rb/lostfound"
          noCaps
          style="border-radius: 8px; height: 55px"
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

const rows = ref([])

export default defineComponent({
  name: 'DashboardRBPage',
  components: {
    UserGreet
  },
  setup() {
    return {
      data: ref([]),
      roomNo: ref(''),
      roomId: ref(),
      comments: ref(''),
      dialog: ref(false),
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
    dialogalert(roomNo) {
      this.dialog = true
      this.roomNo = roomNo['roomNo'].data
      this.roomId = roomNo['taskId'].data
      this.comments = roomNo['Comments'].data
    },
    getTableData(data) {
      this.selected = data
    },
    SubmitData() {
      const comment = {
        comment: this.comments
      }
      this.api.put(`roomboy/${this.roomId}`, comment, ({ status, message }) => {
        if (status == 200) {
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    Start() {
      this.api.post(`roomboy/${this.roomId}/start-task`, null, ({ status, message }) => {
        if (status == 200) {
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    Stop() {
      this.api.post(`roomboy/${this.roomId}/end-task`, null, ({ status, message }) => {
        if (status == 200) {
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    fetchData() {
      this.loading = true

      this.api.get(`roomboy`, ({ status, data, message }) => {
        this.loading = false

        if (status == 200) {
          this.trigger('positive', message)
          const { listTask } = data
          console.log(listTask)
          this.data = listTask.map((lt) => ({
            roomNo: { data: lt.roomNo, style: { backgroundColor: lt.rowColor } },
            RoomType: { data: lt.roomType, style: { backgroundColor: lt.rowColor } },
            Schedule: { data: lt.schedule, style: { backgroundColor: lt.rowColor } },
            Standard: { data: lt.standard, style: { backgroundColor: lt.rowColor } },
            Actual: { data: lt.actual, style: { backgroundColor: lt.rowColor } },
            Remarks: { data: lt.remarks, style: { backgroundColor: lt.rowColor } },
            Status: { data: lt.status, style: { backgroundColor: lt.rowColor } },
            Comments: { data: lt.comments, style: { backgroundColor: lt.rowColor } },
            taskId: { data: lt.taskId, style: { backgroundColor: lt.rowColor } }
          }))

          console.log(this.data)
          // const roomNo = this.data.map((item) => item.roomNo.data)
          // this.roomNo = roomNo
        } else {
          this.trigger('warning', message)
        }
      })
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
