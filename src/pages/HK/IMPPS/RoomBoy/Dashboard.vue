<template>
  <div class="rb full-width">
    <div class="flex justify-between items-center q-pa-md q-mt-md">
      <UserGreet class="q-px-xs" :workload="maidWorkload" :aliases="maidAlias"/>
      <!-- <div style="padding: 5px">
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
      </div> -->
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
    <div class="flex items-center justify-center q-ma-md">
      <HKCard style="width: fit-content">
        <div class="row items-center justify-center q-my-md">
          <q-btn
            dense
            noCaps
            label="Start"
            @click="Start"
            :disable="!this.section"
            class="rb-btn rb-drop-shadow q-py-none text-body1"
            style="border-radius: 8px; margin-inline: 5px"
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
            style="border-radius: 8px; margin-inline: 5px"
            color="negative"
          >
            <q-tooltip v-if="!this.section">Select the task first</q-tooltip>
          </q-btn>
        </div>
        <div class="res q-mx-auto justify-center row">
          <div class="block items-center col items-center justify-center" style="width: 100%">
            <div class="q-ma-md">
              <div class="q-px-xs">Comments</div>
              <q-input
                filled
                dense
                placeholder="Notes..."
                class="spv-input"
                type="textarea"
                v-model="comments"
              />
            </div>
            <!-- <div class="q-mt-lg row items-center justify-center">
              <div>
                <div>Comments</div>
                <q-input
                  filled
                  dense
                  placeholder="Notes..."
                  class="q-mt-md full-width remarks-input text-bold"
                  type="textarea"
                  v-model="comments"
                />
              </div>
            </div> -->

            <div class="row items-center justify-center q-mt-sm">
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
            <div class="row items-center justify-center q-mt-lg q-mb-md">
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
          </div>
          <div class="col">
            <div class="flex items-center q-gutter-md">
              <q-input
                dense
                outlined
                disable
                v-model="roomNo"
                label="Room No"
                class="col-grow text-bold"
              />
              <q-input
                dense
                outlined
                disable
                v-model="schedule"
                label="Schedule"
                class="col-grow text-bold"
              />
              <q-input
                dense
                outlined
                disable
                v-model="status"
                label="Status"
                class="col-grow text-bold"
              />
            </div>
            <q-input
              filled
              dense
              disable
              placeholder="Remarks"
              class="q-mt-md full-width remarks-input"
              type="textarea"
              v-model="remarks"
            />
            <div class="flex items-center q-gutter-md q-mt-xs">
              <q-input
                dense
                outlined
                disable
                v-model="standardTime"
                label="Standard"
                class="col-grow text-bold"
              />
              <q-input
                dense
                disable
                outlined
                v-model="actualTime"
                label="Actual"
                class="col-grow text-bold"
              />
            </div>
          </div>
        </div>
      </HKCard>
    </div>

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
import HKCard from 'src/components/HK/Card/HKCard.vue'

const rows = ref([])

export default defineComponent({
  name: 'DashboardRBPage',
  components: {
    UserGreet,
    HKCard
  },
  setup() {
    return {
      data: ref([]),
      section: ref(false),
      roomNo: ref(''),
      schedule: ref(''),
      status: ref(''),
      remarks: ref(''),
      standardTime: ref(''),
      actualTime: ref(''),
      roomId: ref(),
      maidWorkload: ref('0'),
      maidAlias: ref(''),
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
    this.checkIMPPS()
    this.fetchData()
  },
  beforeUnmount() {
    socket.disconnect()
  },
  methods: {
    checkIMPPS(){
      this.api.get('check', ({ status }) => {
        if(status != 200) return this.trigger('IMPPS didnt run properly, please tell admin')
        socket.emit('refreshTask', {})
      })
    },
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
      this.standardTime = roomNo['Standard'].data
      this.actualTime = roomNo['Actual'].data
      this.remarks = roomNo['Remarks'].data
      this.status = roomNo['Status'].data
      this.schedule = roomNo['Schedule'].data
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
          socket.emit('refreshTask', { message: 'Nigas' })
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
          socket.emit('refreshTask', { message: 'Nigas' })
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
          socket.emit('refreshTask', { message: 'Nigas' })
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
          this.maidWorkload = data.workload
          this.maidAlias = data.aliases
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
  /* width: 45%; */
  min-width: 100px;
}

.rb .rb-drop-shadow {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) !important;
}

.rb .q-field--dense .q-field__control {
  border-radius: 8px;
  background: white;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
}

.rb .rb-input textarea {
  resize: none;
}

.spv .spv-input textarea {
  resize: none;
}
/* .spv .spv-input.q-field--dense .q-field__control {
  width: 290px !important;
  min-width: 200px;
  border-radius: 8px;
  background: white;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
} */

.spv .remarks-input textarea {
  resize: none;
}
.spv .remarks-input.q-field--dense .q-field__control {
  min-width: 200px;
  height: 80px !important;
  border-radius: 8px;
  background: white;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
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

.cropped-image {
  width: 100px;
  height: 100px;
  border-radius: 1px;
  object-fit: cover;
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
@media only screen and (max-width: 600px) {
  .flex.q-mx-auto.justify-center {
    justify-content: center;
  }
}
.flex.q-mx-auto.justify-center > div {
  width: 100%; /* Atur lebar div menjadi 100% */
  max-width: 100%; /* Pastikan div tidak melebihi lebar layar */
}

.res {
  display: block;
}
@media (min-width: 640px) {
  .res {
    display: flex;
  }
}
</style>
