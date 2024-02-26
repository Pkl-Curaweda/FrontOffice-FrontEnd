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
        <div style="display: flex">
          <q-btn
            flat
            square
            color="primary"
            icon="pending_actions"
            @click="showhistory(!this.state)"
            style=""
          >
            <q-tooltip>History</q-tooltip>
          </q-btn>
          <div
            style="scrollbar-width: none; gap: 10px; display: flex; padding: 10px; overflow-x: auto"
          >
            <q-btn
              dense
              noCaps
              color="primary"
              @click="handleacces('addTask')"
              label="Add Task"
              class="q-px-lg"
              style="width: 100%; border-radius: 10px; white-space: nowrap"
            />
            <q-btn
              dense
              noCaps
              color="primary"
              @click="handleacces('changeRoom')"
              label="Change Room Status"
              class="q-px-lg"
              style="width: 100%; white-space: nowrap; border-radius: 10px"
            />
            <q-btn
              dense
              noCaps
              color="primary"
              @click="handleacces('unavailableRoom')"
              label="Unavailable Room Boy"
              class="q-px-lg"
              style="width: 100%; white-space: nowrap; border-radius: 10px"
            />
          </div>
        </div>
        <q-dialog v-model="dialog1">
          <q-card style="width: 300px; justify-content: center">
            <div style="width: 100%; text-align: center; margin-top: 10px">Choose Type</div>
            <div class="q-pa-lg col" style="display: flex; width: 100%; gap: 5px">
              <q-btn
                dense
                noCaps
                color="primary"
                @click="CleanRoom = true"
                label="Clean Room"
                class="q-px-md"
                style="border-radius: 10px; width: 100%"
              />
              <q-btn
                dense
                noCaps
                color="primary"
                @click="Request = true"
                label="Request"
                class="q-px-md"
                style="border-radius: 10px; width: 100%"
              />
            </div>
          </q-card>
        </q-dialog>
        <q-dialog v-model="Request">
          <q-card style="width: 100%">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Add Request Task</div>
              <q-space />
              <q-btn dense flat color="grey" size="sm" outline icon="close" v-close-popup @click="clearData"/>
            </q-bar>
            <div class="q-pa-lg">
              <div style="display: flex; gap: 5px" class="q-pt-lg">
                <q-select
                  outlined
                  style="width: 100%"
                  v-model="roomSelect"
                  :options="listRoomNo"
                  label="RoomNo"
                  dense
                  class="q-mb-md"
                />
                <q-select
                  outlined
                  style="width: 100%"
                  v-model="maidSelect"
                  :options="listMaid"
                  label="Assigned"
                  dense
                  class="q-mb-md"
                />
              </div>
              <div style="display: flex" v-if="this.choosenRoom">
                <div>
                  <img :src="this.choosenRoom.image" style="width: 100px; border-radius: 2px" />
                </div>
                <div style="padding: 10px; gap: 2px">
                  <div>
                    <div>Id : {{ this.choosenRoom.id }}</div>
                    <div>Work Load : {{ this.choosenRoom.workload }}</div>
                  </div>
                </div>
              </div>
              <q-input
                filled
                placeholder="Request"
                type="text"
                v-model="requestInput"
                class="q-my-md"
              />
              <q-input
                filled
                placeholder="Add Comment"
                type="textarea"
                v-model="commentsInput"
                class="q-mb-md"
              />
              <q-card-actions align="right">
                <q-btn v-close-popup label="Cancel" dense no-caps color="primary" outline="" />
                <q-btn
                  @click="postReqTask"
                  v-close-popup="this.roomSelect != null"
                  dense
                  no-caps
                  label="Add Task"
                  color="primary"
                />
              </q-card-actions>
            </div>
          </q-card>
        </q-dialog>
        <q-dialog v-model="CleanRoom">
          <q-card style="width: 100%">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Add Room Task</div>
              <q-space />
              <q-btn dense flat color="grey" size="sm" outline icon="close" v-close-popup @click="clearData"/>
            </q-bar>
            <div class="q-pa-lg">
              <q-select
                outlined
                style="width: 100%"
                v-model="roomSelect"
                :options="listRoomNo"
                label="RoomNo"
                dense
              />
              <div style="display: flex; width: 100%; padding: 8px">
                <div v-if="this.choosenRoom">
                  <img
                    :src="this.choosenRoom.image"
                    class="cropped-image"
                    style="width: 100px; border-radius: 2px"
                  />
                </div>
                <div style="padding: 8px; gap: 2px; width: 100%">
                  <div>
                    <div style="padding: 10px; gap: 2px" v-if="this.choosenRoom">
                      <div>Id : {{ this.choosenRoom.id }}</div>
                      <div>Work Load : {{ this.choosenRoom.workload }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="q-mt-sm"
              style="border-style: dashed; border-width: 1px; border-color: grey"
            />
            <div class="q-pa-lg">
              <div class="q-pa-sm">Assigned</div>
              <q-select
                outlined
                style="width: 100%"
                v-model="maidSelect"
                :options="listMaid"
                label="Assigned"
                dense
              />
              <div style="display: flex; width: 100%">
                <div v-if="this.maidSelect" style="padding: 8px">
                  <img
                    :src="this.choosenMaid.image"
                    class="cropped-image"
                    style="width: 100px; border-radius: 2px"
                  />
                </div>
                <div style="padding: 8px; gap: 2px; width: 100%">
                  <div>
                    <div style="padding: 10px; gap: 2px" v-if="this.maidSelect">
                      <div>Id : {{ this.choosenMaid.id }}</div>
                      <div>Aliases : {{ this.choosenMaid.aliases }}</div>
                      <div>Shift : {{ this.choosenMaid.shift }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <q-input filled placeholder="Add Comment" type="textarea" v-model="commentsInput" />
            </div>
            <q-card-actions align="right">
              <q-btn v-close-popup label="Cancel" dense no-caps color="primary" outline="" />
              <q-btn
                @click="postCleanTask"
                dense
                no-caps
                v-close-popup="this.maidSelect != null"
                label="Change Room"
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialog2">
          <q-card style="width: 600px">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Change Status to: {{ group }}</div>
              <q-space />
              <q-btn dense flat color="grey" size="sm" outline icon="close" v-close-popup @click="clearData"/>
            </q-bar>
            <div class="q-pa-md">
              <q-select
                outlined
                v-model="roomNoSelect"
                :options="optionsRoom"
                label="RoomNo"
                dense
                class="q-mb-md"
              />
              <q-option-group :options="options" type="radio" size="sm" v-model="group" />
            </div>
            <q-card-actions align="right">
              <q-btn v-close-popup label="Cancel" dense no-caps color="primary" outline="" />
              <q-btn
                @click="changeStatus"
                dense
                no-caps
                v-close-popup
                label="Add Task"
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialog3">
          <q-card style="width: 500px">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Unavailable Room Boy</div>
              <q-space />
              <q-btn dense flat color="grey" size="sm" outline icon="close" v-close-popup @click="clearData"/>
            </q-bar>
            <div class="q-pa-lg">
              <q-select
                outlined
                v-model="roomboySelect"
                :options="listRoomboy"
                label="Room Boy"
                dense
                class="q-mb-md"
              />
              <!-- <q-table
                :rows="data"
                row-key="name"
                square
                :card-style="{ boxShadow: 'none' }"
                :rows-per-page-options="[0]"
                :hide-pagination="true"
              >
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <template v-for="(cell, key, i) in props.row" :key="i">
                      <q-td
                        :style="'background-color: #' + cell.style.backgroundColor"
                        @click="
                          !cell.style.backgroundColor.includes('BBE2EC')
                            ? dialogalert(props.row)
                            : ''
                        "
                        v-if="!['taskId'].includes(key)"
                      >
                        {{ cell.data }}
                      </q-td>
                    </template>
                  </q-tr>
                </template></q-table
              > -->
              <div style="display: flex" v-if="this.roomBoy.image">
                <div>
                  <img
                    :src="this.roomBoy.image || user.picture"
                    style="width: 110px; border-radius: 2px"
                  />
                </div>
                <div style="padding: 10px; gap: 2px; display: flex; justify-content: space-between">
                  <div style="display: block">
                    <div>Aliases</div>
                    <div>Shift</div>
                    <div>Work Load</div>
                    <div>Total Task</div>
                  </div>
                  <div style="display: block">
                    <div>: {{ this.roomBoy.aliases }}</div>
                    <div>: {{ this.roomBoy.shift }}</div>
                    <div>: {{ this.roomBoy.workload }}</div>
                    <div>: {{ this.roomBoy.totalTask }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="q-mt-sm"
              style="border-style: dashed; border-width: 1px; border-color: grey"
            />
            <div class="q-pa-lg">
              <div>Send To</div>
              <q-select
                outlined
                v-model="roomboySelectSend"
                :options="listRoomboy"
                label="Room Boy"
                dense
                class="q-mb-md"
              />
              <div style="display: flex" v-if="this.roomBoy2.image">
                <div>
                  <img
                    :src="this.roomBoy2.image || user.picture"
                    style="width: 110px; border-radius: 2px"
                  />
                </div>
                <div style="padding: 10px; gap: 2px; display: flex; justify-content: space-between">
                  <div style="display: block">
                    <div>Aliases</div>
                    <div>Shift</div>
                    <div>Work Load</div>
                  </div>
                  <div style="display: block">
                    <div>: {{ this.roomBoy2.aliases }}</div>
                    <div>: {{ this.roomBoy2.shift }}</div>
                    <div>: {{ this.roomBoy2.workload }}</div>
                  </div>
                </div>
              </div>
            </div>
            <q-card-actions align="right">
              <q-btn v-close-popup label="Cancel" dense no-caps color="primary" outline="" />
              <q-btn @click="postUnvailable" dense no-caps label="Submit" color="primary" />
            </q-card-actions>
            <!-- v-close-popup="this.roomNoSelect != null" -->
          </q-card>
        </q-dialog>
        <div class="my-table">
          <q-table
            :rows-per-page-options="[0]"
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
import { defineComponent, ref, watch, provide, inject } from 'vue'
import { useQuasar } from 'quasar'
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
      options: ref([]),
      comments: ref(''),
      request: ref(''),
      commentsInput: ref(''),
      requestInput: ref(''),
      optionsRoom: [],
      lsitMaid: [],
      listRoomNo: [],
      listRoomboy: [],
      roomBoy: ref([]),
      roomBoy2: ref([]),
      choosenRoom: ref([]),
      choosenMaid: ref([]),
      roomboySelect: ref(''),
      roomSelect: ref(),
      maidSelect: ref(''),
      roomboySelectSend: ref(''),
      dialog1: ref(false),
      dialog2: ref(false),
      dialog3: ref(false),
      CleanRoom: ref(false),
      Request: ref(false),
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
      user: this.$AuthStore.getUser()
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    roomboySelect() {
      if (this.roomboySelect) {
        this.getDataRoomboy(1)
      }
    },
    roomboySelectSend() {
      if (this.roomboySelectSend) {
        this.getDataRoomboy(2)
      }
    },
    roomSelect() {
      this.roomSelect ? this.getDataTask(1) : ''
    },
    maidSelect() {
      this.maidSelect ? this.getDetailMaid() : ''
    }
  },
  methods: {
    clearData() {
      this.comments = null
      this.roomNoSelect = null
      this.currentRating = null
      this.roomboySelect = null
      this.roomboySelectSend = null
      this.maidSelect = null
      this.requestInput = null
      this.commentsInput = null
      this.choosenRoom = null
      this.roomSelect = null
    },
    handleacces(state) {
      if (state == 'unavailableRoom') {
        this.unAvailability()
        this.dialog3 = true
      } else if (state == 'changeRoom') {
        this.dialog2 = true
      } else if (state == 'addTask') {
        this.getDataTask()
        this.dialog1 = true
      }
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
    showhistory(state) {
      this.state = state
      this.fetchData()
    },
    changeStatus() {
      if (this.roomNoSelect != null) {
        this.api.post(
          `spv/change-status/${this.roomNoSelect.label}/${this.group}`,
          null,
          ({ status, message }) => {
            if (status == 200) {
              this.trigger('positive', message)
              this.fetchData()
              this.clearData()
              this.dialog2 = false
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
      this.nextnotify('positive', 'success')
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
          const { listTask, listStatus, listRoom } = data
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

          this.optionsRoom = listRoom.map((item) => ({ label: item.id }))
          // this.optionsRoom = forEach(1)
          // const roomNo = this.data.map((item) => item.roomNo.data)
          // this.roomNo = roomNo
        } else {
          this.trigger('warning', message)
        }
      })
    },
    unAvailability() {
      this.api.get(`spv/helper/unavail?unavail=0&assigne=0`, ({ status, data, message }) => {
        if (status === 200) {
          const { listRoomBoy } = data
          this.listRoomboy = listRoomBoy.map((item) => ({ label: item.name, value: item.id }))
          this.trigger('positive', message)
        }
      })
    },
    getDataRoomboy(state) {
      const value = this.roomboySelect || 0
      const value2 = this.roomboySelectSend || 0

      if (state === 1) {
        this.api.get(
          `spv/helper/unavail?unavail=${value.value}&assigne=0`,
          ({ status, data, message }) => {
            if (status === 200) {
              const { unAvailableData } = data
              this.roomBoy = unAvailableData
            }
          }
        )
      } else if (state === 2) {
        this.api.get(
          `spv/helper/unavail?unavail=0&assigne=${value2.value}`,
          ({ status, data, message }) => {
            if (status === 200) {
              const { assigneData } = data
              this.roomBoy2 = assigneData
            }
          }
        )
      }
    },
    getDataTask(state) {
      try {
        let detailAPI = `spv/helper/add?roomNo=0&roomBoy=0`
        state == 1
          ? (detailAPI = `spv/helper/add?roomNo=${this.roomSelect.label}&roomBoy=0`)
          : `spv/helper/add?roomNo=0&roomBoy=0`
        this.api.get(detailAPI, ({ message, status, data }) => {
          if (status == 200) {
            this.nextnotify('positive', message)
            const { room, maid } = data.list
            this.choosenRoom = data.choosenRoom
            this.listRoomNo = room.map((item) => ({ label: item.id }))
            this.listMaid = maid
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    getDetailMaid() {
      try {
        this.api.get(
          `spv/helper/add?roomNo=0&roomBoy=${this.maidSelect.value}`,
          ({ message, status, data }) => {
            if (status == 200) {
              this.nextnotify('positive', message)
              const { choosenMaid } = data
              this.choosenMaid = choosenMaid
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    postUnvailable() {
      this.api.post(
        `spv/unavail`,
        {
          unAvailableId: this.roomboySelect.value,
          assigneId: this.roomboySelectSend.value
        },
        ({ status, message }) => {
          if (status === 200) {
            this.trigger('positive', message)
            this.roomboySelect = null
            this.roomboySelectSend = null
            this.fetchData()
            this.clearData()
            this.dialog3 = false
          }
        }
      )
    },
    postReqTask() {
      try {
        const change = {
          roomNo: this.roomSelect.label,
          maidId: this.maidSelect.value,
          request: this.requestInput,
          comment: this.commentsInput,
          customWorkload: this.choosenRoom.workload
        }
        this.api.post(`spv/task`, change, ({ message, status }) => {
          if (status == 200) {
            this.trigger('positive', message)
            this.roomSelect.label = null
            this.maidSelect.value = null
            this.requestInput = null
            this.commentsInput = null
            this.choosenRoom.workload = null
            this.fetchData()
            this.clearData()
            this.dialog1 = false
          } else {
            this.trigger('warning', message)
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    postCleanTask() {
      try {
        const change = {
          roomNo: this.roomSelect.label,
          maidId: this.maidSelect.value,
          request: 'Needs to be cleaned',
          comment: this.commentsInput,
          customWorkload: this.choosenRoom.workload
        }
        this.api.post(`spv/task`, change, ({ message, status }) => {
          if (status == 200) {
            this.trigger('positive', message)
            this.roomSelect.label = null
            this.maidSelect.value = null
            this.requestInput = null
            this.commentsInput = null
            this.choosenRoom.workload = null
            this.fetchData()
            this.clearData()
          } else {
            this.trigger('warning', message)
          }
        })
        this.fetchData()
      } catch (error) {
        console.error(error)
      }
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'error unknown action try again',
          timeout: 500
        },
        500
      )
    },
    nextnotify(type, txt) {
      this.$q.notify({
        type: 'ongoing',
        message: 'Loading',
        timeout: 200
      })
      setTimeout(() => {
        if (type == 'positive') {
          this.trigger(type, txt)
        }
      }, 2000)
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

.cropped-image {
  width: 100px;
  height: 100px;
  border-radius: 1px;
  object-fit: cover;
}
</style>
