<template>
  <div class="spv full-width">
    <div class="q-mt-lg q-px-xs">
      <UserGreet class="q-mt-md q-px-xs" :name="user.name" role="Supervisor" />
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
        <div style="width: 100%; justify-content: space-between; display: flex; padding: 10px">
          <q-btn
            flat
            square
            color="primary"
            icon="pending_actions"
            @click="showhistory(!this.state)"
          >
            <q-tooltip>History</q-tooltip>
          </q-btn>
          <q-btn
            dense
            noCaps
            color="primary"
            @click="dialog2 = true"
            label="Change Status"
            class="q-px-lg"
            style="
              border-radius: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
          </q-btn>
        </div>
        <q-dialog v-model="dialog2" persistent>
          <q-card style="width: 300px">
            <div class="q-pa-lg">
              <q-select
                outlined
                v-model="roomNoSelect"
                :options="optionsRoom"
                label="RoomNo"
                dense
                class="q-mb-md"
              />
              <div align="left">Change Status to: {{ group }}</div>
              <q-option-group :options="options" type="radio" size="sm" v-model="group" />
            </div>
            <q-card-actions align="right">
              <q-btn
                @click="changestatus"
                label="Change Status"
                color="primary"
                v-close-popup="this.roomNoSelect != null"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
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
                    :style="'background-color: #' + cell.style.backgroundColor"
                    @click="
                      !cell.style.backgroundColor.includes('BBE2EC') ? dialogalert(props.row) : ''
                    "
                    v-if="!['taskId'].includes(key)"
                  >
                    {{ cell.data }}
                  </q-td>
                </template>
              </q-tr>
            </template>
          </q-table>
          <!-- <q-dialog v-model="dialog" persistent>
            <q-card>
              <div align="center" class="q-pa-sm">{{ this.roomNo }}</div>
              <q-card-actions align="right">
                <q-btn flat label="Ok" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog> -->
        </div>
      </div>
      <q-form class="q-mt-md">
        <div class="q-mx-auto q-mt-lg" style="width: fit-content; min-width: 100px">
          <div class="row items-center q-gutter-sm">
            <q-btn
              dense
              noCaps
              color="primary"
              @click="postOk"
              label="OK"
              class="q-px-lg"
              style="border-radius: 10px"
            />
            <q-btn
              dense
              noCaps
              color="primary"
              @click="reclean"
              label="Re-Clean"
              class="q-px-lg"
              style="border-radius: 10px"
            />
          </div>
        </div>
        <div class="q-mt-lg q-mx-auto" style="width: fit-content">
          <div>
            <div>Comments</div>
            <q-input
              filled
              dense
              placeholder="Notes..."
              class="spv-input"
              type="textarea"
              v-model="comments"
            />
          </div>
          <div class="row items-center justify-end q-mt-sm">
            <q-btn
              dense
              class="text-body1 q-px-md q-py-none"
              label="Submit"
              color="primary"
              @click="SubmitData"
              noCaps
              style="border-radius: 8px"
            />
          </div>
        </div>
        <div class="performance q-my-xl">
          <div class="row items-center justify-center">
            <div class="bg-black q-pa-sm" style="border-radius: 5px">
              <q-icon name="sym_o_earthquake" color="white" size="20px" />
            </div>
            <div class="text-black text-h6 text-weight-bold q-pl-sm">Performance</div>
          </div>

          <div style="display: flex" class="row items-center justify-center q-mt-xs q-gutter-md">
            <template v-for="(data, i) in ratingcolor" :key="i">
              <q-icon name="star" @click="ratingcheck(i + 1)" :color="data.color" size="30px" />
            </template>
            <!-- <q-rating
              v-model="ratingModel"
              style="width: 200px"
              max="5"
              color="yellow-7"
              :size="'50px'"
            /> -->
          </div>
        </div>
        <!-- <div class="q-pa-md q-mx-auto" style="width: fit-content">
          <div class="rating q-mt-lg q-px-md">
            <div class="row items-center q-gutter-sm">
              <div class="text-body1 text-weight-bold">Give rating for room boy!</div>
            </div>
            <div class="row items-center q-gutter-md q-mt-sm q-mb-xl">
              <div class="q-pa-sm" style="background-color: #ffebc0; border-radius: 4px">
                <div class="text-body2" style="color: #98690c">Feedback</div>
              </div>
              <q-rating  v-model="ratingModel" style="width: 200px; "  max="5" color="primary" />

            </div>
          </div>
        </div> -->
      </q-form>
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
      state: ref(false),
      roomNo: ref(''),
      shape: ref('line'),
      currentRating: ref(5),
      ratingDefault: ref('gray'),
      roomId: ref(),
      ratingModel: ref(2),
      group: ref(null),
      roomNoSelect: ref(),
      ratingcolor: ref([
        { color: 'yellow-7' },
        { color: 'yellow-7' },
        { color: 'yellow-7' },
        { color: 'yellow-7' },
        { color: 'yellow-7' }
      ]),
      // optionsRoom: [
      //   'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      // ],
      optionsRoom: [],
      // options: [
      //   { label: 'Vacant Clean Checked', value: 'VC' },
      //   { label: 'Vacant Clean Unchecked', value: 'VCU' },
      //   { label: 'Vacant Dirty', value: 'VD' },
      //   { label: 'Occupied Cleaned', value: 'OC' },
      //   { label: 'Occupied Dirty', value: 'OD' },
      //   { label: 'Expected Departure', value: 'ED' },
      //   { label: 'Do Not Disturb', value: 'DnD' },
      //   { label: 'Out Of Order', value: 'OOO' },
      //   { label: 'Off Market', value: 'OM' }
      // ],
      options: ref([]),
      comments: ref(''),
      dialog: ref(false),
      dialog2: ref(false),
      columns: [
        {
          name: 'roomNo',
          label: 'Room No',
          align: 'left',
          field: 'roomNo'
        },
        { name: 'RoomType', label: 'Room Type', align: 'center', field: 'RoomType' },
        { name: 'Schedule', label: 'Schedule', align: 'center', field: 'Schedule' },
        { name: 'Standard', label: 'Standard', align: 'center', field: 'Standard' },
        { name: 'Actual', label: 'Actual', align: 'center', field: 'Actual' },
        { name: 'Remarks', label: 'Remarks', align: 'center', field: 'Remarks' },
        { name: 'Status', label: 'Status', align: 'center', field: 'Status' },
        { name: 'PIC', label: 'PIC', align: 'center', field: 'PIC' },
        { name: 'Comments', label: 'Comments', align: 'center', field: 'Comments' }
      ],
      selected: []
    }
  },
  data() {
    return {
      api: new this.$Api('impps'),
      user: this.$AuthStore.getUser(),
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
  },
  methods: {
    ratingcheck(i) {
      // console.log(ratingcolor)
      console.log(i)
      let listRating = []
      for(let rating = 1; rating <= 5; rating++){
        listRating.push({
          color: rating <= i ? "yellow-7" : "light-green-3"
        })
      console.log(listRating)
      }
      this.ratingcolor = listRating
      this.currentRating = i
    },
    showhistory(state) {
      console.log(state)
      this.state = state
      this.fetchData()
    },
    changestatus() {
      if (this.roomNoSelect != null) {
        this.api.post(
          `spv/change-status/${this.roomNoSelect}/${this.group}`,
          null,
          ({ status, message }) => {
            if (status == 200) {
              this.trigger('possitive', message)
              this.fetchData()
            } else {
              this.trigger('negative', message)
            }
          }
        )
      } else {
        this.trigger('warning')
      }
    },
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
      this.api.put(`spv/${this.roomId}`, comment, ({ status, message }) => {
        if (status == 200) {
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    postOk() {
      const data = {
        performance: this.currentRating,
        comment: this.comments
      }
      this.api.post(`spv/${this.roomId}/ok`, data, ({ status, message }) => {
        if (status == 200) {
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    reclean() {
      this.api.post(`spv/${this.roomId}/re-clean`, null, ({ status, message }) => {
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

      this.api.get(`spv?history=${this.state}`, ({ status, data, message }) => {
        this.loading = false

        if (status == 200) {
          const { listTask, listStatus } = data
          console.log(listTask)
          this.options = listStatus.map((data) => ({
            label: data.longDescription,
            value: data.shortDescription
          }))
          this.data = listTask.map((lt) => ({
            roomNo: { data: lt.roomNo, style: { backgroundColor: lt.rowColor } },
            RoomType: { data: lt.roomType.longDesc, style: { backgroundColor: lt.rowColor } },
            Schedule: { data: lt.schedule, style: { backgroundColor: lt.rowColor } },
            Standard: { data: lt.standard, style: { backgroundColor: lt.rowColor } },
            Actual: { data: lt.actual, style: { backgroundColor: lt.rowColor } },
            Remarks: { data: lt.remarks, style: { backgroundColor: lt.rowColor } },
            Status: { data: lt.status, style: { backgroundColor: lt.rowColor } },
            PIC: { data: lt.pic, style: { backgroundColor: lt.rowColor } },
            Comments: { data: lt.comments, style: { backgroundColor: lt.rowColor } },
            taskId: { data: lt.taskId, style: { backgroundColor: lt.rowColor } }
          }))
          this.optionsRoom = this.data.map((item) => item.roomNo.data)
          // console.log(this.option)
          console.log(this.optionsRoom)

          // this.optionsRoom = forEach(1)
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
          message: txt || 'error unknown action try again',
          timeout: 1000
        },
        1000
      )
    }
  }
})
</script>

<style>
.spv .spv-input textarea {
  resize: none;
}
.spv .spv-input.q-field--dense .q-field__control {
  width: 290px !important;
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
</style>
