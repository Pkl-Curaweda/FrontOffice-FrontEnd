<template>
  <div class="spv full-width">
    <div class="q-mt-lg q-px-xs">
      <div class="flex justify-between items-center q-pa-md q-mt-md">
        <UserGreet class="q-mt-md q-px-xs" :name="user.name" role="Supervisor" />
        <div class="q-gutter-md flex items-center">
          <label>Shown Task Color:</label>
          <input
            type="checkbox"
            dense
            v-model="sortRed"
            color="red"
            style="transform: scale(1.5); accent-color: #f28585; color: white"
          />
          <input
            type="checkbox"
            dense
            v-model="sortWhite"
            color="white"
            style="transform: scale(1.5); accent-color: #ddd"
          />
          <input
            type="checkbox"
            dense
            v-model="sortYellow"
            color="yellow"
            style="transform: scale(1.5); accent-color: #fffc9b"
          />
          <input
            type="checkbox"
            dense
            v-model="sortGreen"
            color="greem"
            style="transform: scale(1.5); accent-color: #b7e5b4"
          />
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
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div
            style="scrollbar-width: none; gap: 10px; display: flex; padding: 10px; overflow-x: auto"
          >
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
          <!-- <q-btn flat square color="primary" icon="refresh" @click="refreshData" style="">
            <q-tooltip>Refresh</q-tooltip>
          </q-btn> -->
        </div>
        <q-dialog v-model="dialog1">
          <!-- Dialog To Choose Clean Room or Request -->
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
          <!-- Dialog For Request -->
          <q-card style="width: 100%">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Add Request Task</div>
              <q-space />
              <q-btn dense flat color="grey" size="sm" outline icon="close" v-close-popup />
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
                />
                <q-select
                  outlined
                  style="width: 100%"
                  v-model="maidSelect"
                  :options="listMaid"
                  label="Assigned"
                  dense
                />
              </div>
              <div style="display: flex; padding-top: 20px; width: 100%" v-if="this.choosenRoom">
                <div class="flex row" style="width: 50%">
                  <div class="col">
                    <img :src="this.choosenRoom.image" style="width: 100px; border-radius: 2px" />
                  </div>
                  <div style="padding: 4px; gap: 2px; width: 100%" class="col">
                    <div>
                      <div>Id : {{ this.choosenRoom.id }}</div>
                      <div>Work Load : {{ this.choosenRoom.workload }}</div>
                    </div>
                  </div>
                </div>
                <div class="flex row" style="width: 50%">
                  <div v-if="this.maidSelect" style="padding: 8px" class="col">
                    <img
                      :src="this.choosenMaid.image"
                      class="cropped-image"
                      style="width: 100px; border-radius: 2px"
                    />
                  </div>
                  <div style="padding: 4px; gap: 2px; width: 100%" class="col">
                    <div>
                      <div style="padding: 10px; gap: 2px" v-if="this.maidSelect">
                        <div>Id : {{ this.choosenMaid.id }}</div>
                        <div>Aliases : {{ this.choosenMaid.aliases }}</div>
                        <div>Shift : {{ this.choosenMaid.shift }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 5px">
                <q-input
                  filled
                  dense
                  placeholder="Request"
                  style="width: 100%"
                  type="text"
                  v-model="requestInput"
                  class="q-my-md"
                />
                <q-input
                  filled
                  style="width: 100%"
                  dense
                  placeholder="Finish in (Minute)"
                  type="number"
                  v-model="workloadInput"
                  class="q-my-md"
                />
              </div>
              <q-input
                filled
                placeholder="Add Comment"
                type="textarea"
                v-model="commentsInput"
                class="q-mb-md"
              />
              <q-card-actions align="right">
                <q-btn v-close-popup label="Cancel" dense no-caps color="primary" outline="" />
                <q-btn @click="postReqTask" dense no-caps label="Add Task" color="primary" />
              </q-card-actions>
            </div>
          </q-card>
        </q-dialog>
        <q-dialog v-model="CleanRoom">
          <!-- Dialog for Clean Room -->
          <q-card style="width: 100%">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Add Room Task</div>
              <q-space />
              <q-btn dense flat color="grey" size="sm" outline icon="close" v-close-popup />
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
              <q-btn label="Cancel" v-close-popup dense no-caps color="primary" outline="" />
              <q-btn dense no-caps @click="postCleanTask" label="Add Task" color="primary" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialog2">
          <!-- Dialog to Change status -->
          <q-card style="width: 600px">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Change Status to: {{ group }}</div>
              <q-space />
              <q-btn
                dense
                flat
                color="grey"
                size="sm"
                outline
                icon="close"
                v-close-popup
                @click="clearData"
              />
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
              <q-btn @click="changeStatus" dense no-caps label="Change Status" color="primary" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialog3">
          <!-- Dialog for Unavailable Maid -->
          <q-card style="width: 500px">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Unavailable Room Boy</div>
              <q-space />
              <q-btn dense flat color="grey" size="sm" outline icon="close" v-close-popup />
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
              <div style="display: flex" v-if="this.roomBoy?.image">
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
              <div style="display: flex" v-if="this.roomBoy2?.image">
                <div>
                  <img
                    :src="this.roomBoy2?.image || user.picture"
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
                    <div>: {{ this.roomBoy2?.aliases }}</div>
                    <div>: {{ this.roomBoy2?.shift }}</div>
                    <div>: {{ this.roomBoy2?.workload }}</div>
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
      <!-- <q-form class="q-mt-md">
        <div class="q-mx-auto q-mt-lg" style="width: fit-content; min-width: 100px">
          <div class="row items-center q-gutter-sm">
            <q-btn
              dense
              noCaps
              :disable="!roomId"
              color="primary"
              @click="postOk"
              label="OK"
              class="q-px-lg"
              style="border-radius: 10px"
            >
              <q-tooltip v-if="!this.roomId">Select the task first</q-tooltip>
            </q-btn>
            <q-btn
              dense
              noCaps
              :disable="!roomId"
              color="primary"
              @click="reclean"
              label="Re-Clean"
              class="q-px-lg"
              style="border-radius: 10px"
              ><q-tooltip v-if="!this.roomId">Select the task first</q-tooltip>
            </q-btn>
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
              :disable="!roomId"
              @click="SubmitData"
              noCaps
              style="border-radius: 8px"
              ><q-tooltip v-if="!this.roomId">Select the task first</q-tooltip>
            </q-btn>
          </div>
        </div> -->
      <!-- <div class="performance q-my-xl">
          <div class="row items-center justify-center">
            <div class="bg-black q-pa-sm" style="border-radius: 5px">
              <q-icon name="sym_o_earthquake" color="white" size="20px" />
            </div>
            <div class="text-black text-h6 text-weight-bold q-pl-sm">Performance</div>
          </div> -->

      <!-- </div> -->
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
      <!-- </q-form> -->
      <div class="flex items-center justify-center q-my-md">
        <HKCard style="width: fit-content">
          <div class="flex q-gutter-md">
            <q-form>
              <div class="q-mx-auto" style="width: fit-content">
                <div>
                  <q-input
                    filled
                    dense
                    placeholder="Comments"
                    class="spv-input"
                    type="textarea"
                    v-model="comments"
                  />
                </div>
                <div class="row items-center q-gutter-sm q-mt-xs">
                  <q-btn
                    dense
                    noCaps
                    :disable="!roomId"
                    color="primary"
                    @click="postOk"
                    label="OK"
                    class="q-px-lg"
                    style="border-radius: 10px"
                  >
                    <q-tooltip v-if="!this.roomId">Select the task first</q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    noCaps
                    :disable="!roomId"
                    color="primary"
                    @click="reclean"
                    label="Re-Clean"
                    class="q-px-lg"
                    style="border-radius: 10px"
                    ><q-tooltip v-if="!this.roomId">Select the task first</q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    class="text-body1 q-px-md"
                    label="Submit"
                    color="primary"
                    :disable="!roomId"
                    @click="SubmitData"
                    noCaps
                    style="border-radius: 8px"
                    ><q-tooltip v-if="!this.roomId">Select the task first</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-form>

            <div>
              <div class="flex items-center q-gutter-md">
                <q-input
                  dense
                  outlined
                  disable
                  v-model="roomNo"
                  label="Room No"
                  style="width: 5vw"
                  class="col-grow text-bold"
                />
                <q-input
                  dense
                  outlined
                  disable
                  v-model="schedule"
                  label="Schedule"
                  class="col-grow text-bold"
                >
                  <template v-slot:after>
                    <!-- <q-btn round dense flat icon="edit" />  -->
                    <q-btn-dropdown
                      dense
                      flat
                      :disable="!roomId"
                      style="color: rgb(155, 155, 155)"
                      class="text-capitalize col-grow q-py-sm q-px-sm"
                      dropdown-icon="edit"
                      no-icon-animation
                    >
                      <div style="display: block">
                        <q-time v-model="schedulefirst" format24h now-btn>
                          <q-btn
                            dense
                            noCaps
                            v-close-popup="this.schedulefirst != this.schedule.split(' - ')[0]"
                            color="primary"
                            @click="changeSchedule()"
                            label="Changes"
                            class="q-px-lg"
                            style="width: 100%; border-radius: 10px"
                        /></q-time>
                      </div>
                    </q-btn-dropdown> </template
                ></q-input>

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
              <div
                style="display: flex"
                class="row items-center justify-center q-mt-xs q-gutter-md"
              >
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
          </div>
        </HKCard>
      </div>
    </div>
  </div>
</template>

<script>
import UserGreet from 'src/components/HK/IMPPS/General/UserGreet.vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'
import { defineComponent, ref, watch, provide, inject } from 'vue'
import { useQuasar } from 'quasar'
import socket from '../../../../services/socket/socket'

const rows = ref([])

export default defineComponent({
  name: 'DashboardRBPage',
  components: {
    UserGreet,
    HKCard
  },
  setup() {
    return {
      schedulefirst: ref('00:00'),
      sortRed: ref(true),
      sortYellow: ref(true),
      sortGreen: ref(true),
      sortWhite: ref(true),
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
      workloadInput: ref(),
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
      rootApi: new this.$Api('root'),
      user: this.$AuthStore.getUser()
    }
  },
  mounted() {
    this.fetchData()
    this.checkIMPPS()
    this.socket()
  },
  watch: {
    sortRed: {
      handler() {
        this.fetchData()
      }
    },
    sortWhite: {
      handler() {
        this.fetchData()
      }
    },
    sortYellow: {
      handler() {
        this.fetchData()
      }
    },
    sortGreen: {
      handler() {
        this.fetchData()
      }
    },
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
    Request: {
      handler(value) {
        if (!value) this.cleanForm()
      }
    },
    CleanRoom: {
      handler(value) {
        if (!value) this.cleanForm()
      }
    },
    dialog2: {
      handler(value) {
        if (!value) this.cleanForm()
      }
    },
    dialog3: {
      handler(value) {
        if (!value) this.cleanForm()
      }
    },
    roomSelect() {
      this.roomSelect ? this.getDataTask(1) : ''
    },
    maidSelect() {
      this.maidSelect ? this.getDetailMaid() : ''
    }
  },
  beforeUnmount() {
    socket.disconnect()
  },
  methods: {
    setSchedule() {},
    checkIMPPS() {
      this.api.get('check', ({ status }) => {
        if (status != 200) return this.trigger('IMPPS didnt run properly, please tell admin')
        socket.emit('refreshTask', {})
      })
    },
    socket() {
      socket.on('refreshTask', (data) => {
        this.fetchData()
      })
      socket.on('diss', () => {
        this.rootApi.get('/auth/check-token', () => {})
      })
    },
    validateInput(modelValue, message, required = true) {
      if (required) if (!modelValue) throw Error(message)
    },
    cleanForm() {
      const listOfModels = [
        'roomSelect',
        'maidSelect',
        'requestInput',
        'workloadInput',
        'commentsInput',
        'roomBoy',
        'roomBoy2',
        'roomSelect',
        'roomNoSelect',
        'group',
        'choosenRoom',
        'roomboySelect',
        'roomboySelectSend'
      ]
      for (let model of listOfModels) {
        this[model] = null
      }
    },
    refreshData() {
      this.fetchData()
    },
    changeSchedule() {
      this.api.post(
        `spv/change-schedule/${this.roomId}`,
        {
          startTime: this.schedulefirst
        },
        ({ message, status, data }) => {
          if (status === 200) return this.trigger('positive', message)
          this.refreshData()
          this.schedule = data.data.schedule
          console.log(data.data.schedule)
        }
      )
    },
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
      console.log('masuk kntl')
      let listRating = []
      for (let rating = 1; rating <= 5; rating++) {
        listRating.push({
          color: rating <= i ? 'yellow-7' : 'light-green-3'
        })
      }
      this.ratingcolor = listRating
      console.log(i)
      this.currentRating = i
    },
    showhistory(state) {
      this.state = state
      this.fetchData()
    },
    changeStatus() {
      try {
        this.validateInput(this.roomNoSelect, 'Please specify the Room Number', true)
        this.validateInput(this.group, 'Please specify the Status', true)

        this.api.post(
          `spv/change-status/${this.roomNoSelect.label}/${this.group}`,
          null,
          ({ status, message }) => {
            if (status == 200) {
              this.trigger('positive', message)
              this.fetchData()
              this.dialog2 = false
            } else {
              this.trigger('negative', message)
            }
          }
        )
      } catch (err) {
        return this.trigger('negative', err.message)
      }
    },
    dialogalert(roomNo) {
      this.roomNo = roomNo['roomNo'].data
      this.roomId = roomNo['taskId'].data
      this.comments = roomNo['Comments'].data
      this.schedule = roomNo['Schedule'].data
      this.status = roomNo['Status'].data
      this.remarks = roomNo['Remarks'].data
      this.standardTime = roomNo['Standard'].data
      this.actualTime = roomNo['Actual'].data

      this.schedulefirst = this.schedule.split(' - ')[0]
      console.log(this.schedulefirst)
    },
    getTableData(data) {
      this.selected = data
    },
    SubmitData() {
      try {
        this.validateInput(this.roomId, 'Please specify Room Number', true)
        const comment = {
          comment: this.comments || ''
        }
        this.api.put(`spv/${this.roomId}`, comment, ({ status, message }) => {
          if (status == 200) {
            socket.emit('notif', { message: 'Nigas' })
            socket.emit('refreshTask', { message: 'Nigas' })
            this.trigger('positive', message)
            this.fetchData()
          } else {
            this.trigger('negative', message)
          }
        })
      } catch (err) {
        return this.trigger('negative', err.message)
      }
    },
    postOk() {
      this.validateInput(this.roomId, 'Please specify Room Number', true)

      const data = {
        performance: this.currentRating,
        comment: this.comments
      }
      this.api.post(`spv/${this.roomId}/ok`, data, ({ status, message }) => {
        if (status == 200) {
          socket.emit('notif', { message: 'Nigas' })
          socket.emit('refreshTask', { message: 'Nigas' })
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    reclean() {
      this.validateInput(this.roomId, 'Please specify Room Number', true)
      this.api.post(`spv/${this.roomId}/re-clean`, null, ({ status, message }) => {
        if (status == 200) {
          socket.emit('notif', { message: 'Nigas' })
          socket.emit('refreshTask', { message: 'Nigas' })
          this.trigger('positive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    fetchData() {
      this.loading = true

      let url = `spv?history=${this.state}&urgent=${this.sortRed}&existed=${this.sortWhite}&current=${this.sortYellow}&check=${this.sortGreen}`

      this.api.get(url, ({ status, data, message }) => {
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
        } else {
          this.trigger('negative', message)
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
      try {
        this.validateInput(this.roomboySelect, "Please Specify which Room Boy That's Unavailable")
        this.validateInput(this.roomboySelectSend, 'Please Specify which Room Boy to Assign to')
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
      } catch (err) {
        return this.trigger('negative', err.message)
      }
    },
    postReqTask() {
      try {
        this.validateInput(this.roomSelect, 'Please specify Room Number')
        this.validateInput(
          this.maidSelect,
          'Please specify Room Boy that will be assigned to this task'
        )
        this.validateInput(this.requestInput, 'Please specify Task Request')
        this.validateInput(this.workloadInput, 'Please specify the workload of this task')

        const change = {
          roomNo: this.roomSelect.label,
          maidId: this.maidSelect.value,
          request: this.requestInput,
          comment: this.commentsInput,
          customWorkload: this.workloadInput
        }
        this.api.post(`spv/task`, change, ({ message, status }) => {
          if (status == 200) {
            socket.emit('refreshTask', { message: 'Nigas' })
            this.trigger('positive', message)
            this.dialog1 = false
            this.Request = false
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
      } catch (error) {
        return this.trigger('negative', error.message)
      }
    },
    postCleanTask() {
      try {
        this.validateInput(this.roomSelect, 'Please specify Room Number')
        this.validateInput(
          this.maidSelect,
          'Please specify Room Boy that will be assigned to this task'
        )
        const change = {
          roomNo: this.roomSelect.label,
          maidId: this.maidSelect.value,
          request: 'Needs to be cleaned',
          comment: this.commentsInput,
          customWorkload: this.choosenRoom.workload
        }
        this.api.post(`spv/task`, change, ({ message, status }) => {
          if (status == 200) {
            socket.emit('refreshTask', { message: 'Nigas' })
            this.trigger('positive', message)
            this.dialog1 = false
            this.CleanRoom = false
            this.roomSelect.label = null
            this.maidSelect.value = null
            this.requestInput = null
            this.commentsInput = null
            this.choosenRoom.workload = null
            this.fetchData()
          } else {
            this.trigger('warning', message)
          }
        })
        this.fetchData()
      } catch (error) {
        return this.trigger('negative', error.message)
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
  border-radius: 8px;
  background: white;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
}

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
</style>
