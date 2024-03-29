<template>
  <div class="rb full-width">
    <div class="flex justify-between items-center q-pa-md q-mt-md">
      <UserGreet class="q-px-xs" />
      <div style="padding: 5px">
        <q-btn
          dense
          color="primary"
          outline
          rounded
          class="q-pr-sm"
          @click="refreshData"
          style="width: 100%; height: 100%"
          no-caps
          icon="refresh"
          label="refresh"
        >
          <q-tooltip>Refresh</q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="q-mt-md q-px-xs">
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
      <q-btn flat square color="primary" icon="pending_actions" @click="showhistory(!this.state)">
        <q-tooltip>History</q-tooltip>
      </q-btn>
      <div class="my-table">
        <q-table
          class="no-shadow"
          v-model:pagination="pagination"
          @request="onPaginationChange"
          :rows="data"
          :loading="loading"
          :rows-per-page-options="[0]"
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
      </div>
    </div>
    <q-form class="q-mt-lg q-mx-auto" style="width: 242px; min-width: 200px">
      <div class="row items-center justify-between full-width">
        <q-btn
          dense
          noCaps
          label="Start"
          @click="Start"
          :disable="!this.section"
          class="rb-btn rb-drop-shadow q-py-none text-body1"
          style="border-radius: 8px"
          color="primary"
        >
          <q-tooltip v-if="!this.section">Select the task first</q-tooltip>
        </q-btn>
        <q-btn
          dense
          noCaps
          label="End"
          :disable="!this.section"
          @click="Stop"
          class="rb-btn rb-drop-shadow q-py-none text-body1"
          style="border-radius: 8px"
          color="negative"
        >
          <q-tooltip v-if="!this.section">Select the task first</q-tooltip>
        </q-btn>
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
          :disable="!this.section"
          @click="SubmitData"
        >
          <q-tooltip v-if="!this.section">Select the task first</q-tooltip>
        </q-btn>
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
      <div style="display: flex" class="row items-center justify-center q-mt-xs q-gutter-md">
        <template v-for="(data, i) in ratingcolor" :key="i">
          <q-icon name="star" :color="data.color" size="50px" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import UserGreet from 'src/components/HK/IMPPS/General/UserGreet.vue'
import { defineComponent, ref } from 'vue'
import socket from '../../../../services/socket/socket'

const rows = ref([])

export default defineComponent({
  name: 'DashboardRBPage',
  components: {
    UserGreet
  },
  setup() {
    return {
      data: ref([]),
      section: ref(false),
      roomNo: ref(''),
      roomId: ref(),
      comments: ref(''),
      state: ref(false),
      ratingcolor: ref([
        { color: 'yellow-7' },
        { color: 'yellow-7' },
        { color: 'yellow-7' },
        { color: 'yellow-7' },
        { color: 'yellow-7' }
      ]),
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
        { name: 'Priority', label: 'Priority', align: 'center', field: 'Priority' },
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
    this.socket()
    this.fetchData()
  },
  beforeUnmount(){
    socket.disconnect()
  },
  methods: {
    socket(){
      socket.on('refreshTask', data => {
        this.fetchData()
      })
    },
    refreshData() {
      this.fetchData()
    },
    showhistory(state) {
      this.state = state
      this.fetchData()
    },
    dialogalert(roomNo) {
      this.section = true
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
        socket.emit('refreshTask', { message: "Nigas" })
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
        socket.emit('refreshTask', { message: "Nigas" })
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
        socket.emit('refreshTask', { message: "Nigas" })
        if (status == 200) {
          this.trigger('positive', 'Task finished')
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    fetchData() {
      this.loading = true
      this.api.get(`roomboy?history=${this.state}`, ({ status, data, message }) => {
        this.loading = false

        if (status == 200) {
          const { listTask, performance } = data
          this.data = listTask.map((lt) => ({
            roomNo: { data: lt.roomNo, style: { backgroundColor: lt.rowColor } },
            RoomType: { data: lt.roomType.longDesc, style: { backgroundColor: lt.rowColor } },
            Schedule: { data: lt.schedule, style: { backgroundColor: lt.rowColor } },
            Standard: { data: lt.standard, style: { backgroundColor: lt.rowColor } },
            Actual: { data: lt.actual, style: { backgroundColor: lt.rowColor } },
            Remarks: { data: lt.remarks, style: { backgroundColor: lt.rowColor } },
            Priority: { data: lt.remarks, style: { backgroundColor: lt.rowColor } },
            Status: { data: lt.status, style: { backgroundColor: lt.rowColor } },
            Comments: { data: lt.comments, style: { backgroundColor: lt.rowColor } },
            taskId: { data: lt.taskId, style: { backgroundColor: lt.rowColor } }
          }))
          this.ratingcheck(performance)
          // const roomNo = this.data.map((item) => item.roomNo.data)
          // this.roomNo = roomNo
        } else {
          this.trigger('warning', message)
        }
      })
    },
    ratingcheck(i) {
      let listRating = []
      for (let rating = 1; rating <= 5; rating++) {
        listRating.push({
          color: rating <= i ? 'yellow-7' : 'light-green-3'
        })
      }
      this.ratingcolor = listRating
      this.currentRating = i
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
