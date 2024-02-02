<template>
  <q-page
    class="column"
    style="overflow-y: hidden; width: fit-content; min-height: calc(100vh - 51.25px)"
  >
    <div>
      <div style="display: flex">
        <div>
          <HKCard style="height: fit-content" class="col-grow">
            <div>
              <div
                class="q-pt-sm q-gutter-x-md"
                style="display: flex; flex-wrap: wrap; align-items: center"
              >
                <label for="display" class="q-mt-md text-weight-bold text-body2">Sorting</label>
                <div class="ambatukam">
                  <q-btn-dropdown
                    flat
                    square
                    style="border: 1px #00000030 solid"
                    class="text-capitalize text-black rounded-borders"
                    :label="filterDisplayLabel"
                    color="primary"
                    dropdown-icon="o_expand_more"
                  >
                    <q-list>
                      <q-item
                        clickable
                        v-close-popup
                        @click="setFilterDisplay('roomNum', 'Room Number')"
                      >
                        <q-item-section>Room Number</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="setFilterDisplay('roomType', 'Bed Type')"
                      >
                        <q-item-section>Room Type</q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        @click="setFilterDisplay('bedType', 'Bed Type')"
                      >
                        <q-item-section>Bed Type</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="setFilterDisplay(null, 'All')">
                        <q-item-section>All</q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                  <HKPrintModal :rows="dataRows" :columns="dataColumns" />
                </div>
              </div>

              <div class="tableComp">
                <q-table
                  :rows="dataRows"
                  :columns="dataColumns"
                  row-key="name"
                  square
                  class="q-pa-md"
                  :table-header-style="{
                    backgroundColor: '#069550',
                    color: '#ffffff',
                    padding: '10px'
                  }"
                  :card-style="{ boxShadow: 'none' }"
                  rows-per-page-label="Show"
                  v-model:pagination="paginationRoom"
                  @request="onPaginationChangeRoom"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
                      <q-td key="room-no" :props="props" @click="handleClick(props.row.roomno)">
                        {{ props.row.roomno }}
                      </q-td>
                      <q-td key="roomtype" :props="props" @click="handleClick(props.row.roomno)">
                        {{ props.row.roomtype }}
                      </q-td>
                      <q-td key="btype" :props="props" @click="handleClick(props.row.roomno)">
                        {{ props.row.btype }}
                      </q-td>
                      <q-td
                        key="statusdescription"
                        :props="props"
                        @click="handleClick(props.row.roomno)"
                      >
                        {{ props.row.statusdescription }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </div>
          </HKCard>
        </div>
        <div class="column" style="margin-bottom: auto">
          <div>
            <HKCard style="width: fit-content">
              <div class="row q-py-xl justify-between">
                <div class="column">
                  <div class="text-weight-bold">Change Status to :</div>
                  <q-radio
                    v-for="option in options"
                    :key="option.val"
                    v-model="status"
                    :val="option.val"
                    :label="option.label"
                    :color="option.color"
                    :size="option.size"
                    dense
                    :class="option.class"
                  />
                </div>
                <div style="align-items: center">
                  <div
                    style="display: flex; justify-content: center; align-items: center; gap: 10px"
                  >
                    <div class="text-weight-bold text-body1">Room No:</div>
                    <div
                      class="col-grow"
                      style="
                        height: 30px;
                        background-color: white;
                        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <div>{{ idRoom }}</div>
                    </div>
                  </div>
                  <q-btn
                    label="Change Status"
                    style="border-radius: 10px; width: 160px; background-color: #81bb78"
                    @click="handleRefresh"
                    class="text-weight-bold q-mt-lg"
                    push
                    no-caps
                    text-color="black"
                  />
                </div>
              </div>
            </HKCard>
          </div>
          <div class="q-mt-xl">
            <div class="row">
              <div class="text-weight-bold col-4 rstatus">Room Status</div>
              <div
                class="text-center flex flex-center text-weight-bold"
                style="
                  background-color: #81bb78;
                  border-right: 1px solid black;
                  height: 40px;
                  border-top-left-radius: 5px;
                  border-bottom-left-radius: 5px;
                "
              >
                {{ statusRoomNo || 0 }}
              </div>
              <div
                class="text-center flex flex-center text-weight-bold"
                style="
                  background-color: #81bb78;
                  height: 40px;
                  border-top-right-radius: 5px;
                  border-bottom-right-radius: 5px;
                "
              >
                {{ statusRoom }}
              </div>
            </div>
          </div>
          <div class="ambasing">
            <div>
              <div style="background-color: #069550" class="text-weight-bold flex flex-center">
                <div class="flex flex-center text-white col q-ml-xl">Queuing Rooms</div>
                <q-btn flat round class="q-ml-auto"
                  ><svg
                    width="32"
                    height="31"
                    viewBox="0 0 32 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.8829 12.6548L24.9615 17.5852L29.9017 12.5166"
                      stroke="white"
                      stroke-width="2"
                    />
                    <path
                      d="M20.6486 22.7229C18.9907 23.709 17.0531 24.1215 15.1364 23.8965C13.2196 23.6715 11.4308 22.8215 10.0474 21.4785C8.66399 20.1354 7.76327 18.3743 7.48495 16.4683C7.20663 14.5622 7.56625 12.6178 8.50805 10.9365C9.44985 9.25525 10.9212 7.93112 12.6939 7.16949C14.4665 6.40785 16.4415 6.25129 18.3124 6.72406C20.1834 7.19684 21.8457 8.27254 23.0416 9.78433C24.2376 11.2961 24.9003 13.1595 24.9269 15.0855"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </q-btn>
              </div>
              <q-table
                :rows="dataRows2"
                :columns="dataColumns2"
                row-key="name"
                style="margin-top: 2px; width: fit-content"
                square
                :table-header-style="{
                  backgroundColor: '#069550',
                  color: '#ffffff',
                  padding: '10px'
                }"
                rows-per-page-label="Show"
                v-model:pagination="paginationTask"
                @request="onPaginationChangeTask"
              >
                <template v-slot:body="props">
                  <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
                    <q-td key="roomno" :props="props">
                      {{ props.row.roomno }}
                    </q-td>
                    <q-td key="Request" :props="props">
                      {{ props.row.Request }}
                    </q-td>
                    <q-td key="PIC" :props="props">
                      {{ props.row.PIC }}
                    </q-td>
                    <q-td key="Status" :props="props">
                      {{ props.row.Status }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKPrintModal from 'src/components/HK/Modal/HKPrintModal.vue'

const dataColumns = [
  {
    name: 'room-no',
    required: true,
    label: 'Rm No',
    align: 'left',
    field: 'roomno'
  },
  {
    name: 'roomtype',
    align: 'left',
    label: 'RType',
    field: 'roomtype'
  },
  {
    name: 'btype',
    align: 'left',
    label: 'BType',
    field: 'btype'
  },
  {
    name: 'statusdescription',
    align: 'left',
    label: 'Status Description',
    field: 'statusdescription'
  }
]

const dataColumns2 = [
  {
    name: 'roomno',
    required: true,
    label: 'Room No',
    align: 'left',
    field: 'roomno'
  },
  {
    name: 'Request',
    align: 'left',
    label: 'Request',
    field: 'Request'
  },
  {
    name: 'PIC',
    align: 'left',
    label: 'PIC',
    field: 'PIC'
  },
  {
    name: 'Status',
    align: 'left',
    label: 'Status',
    field: 'Status'
  }
]

export default defineComponent({
  name: 'StatusPage',
  components: { HKCard, HKPrintModal },
  setup() {
    return {
      statusRoom: ref(),
      statusRoomNo: ref(),
      dataColumns,
      dataColumns2,
      idRoom: ref(),
      filterDisplay: ref('roomNum'),
      filterDisplayLabel: ref('Room Number'),
      dataRows2: ref(),
      dataRows: ref(),
      model: ref('All'),
      model2: ref('Room Number')
      // options: ['All', 'Waduhek'],
      // options2: ['Room Number']
    }
  },
  data() {
    return {
      status: '',
      options: [
        {
          val: 'VC',
          label: 'Vacant Clean',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-md'
        },
        {
          val: 'VCU',
          label: 'Vacant Clean Unchecked',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-sm'
        },
        { val: 'VD', label: 'Vacant Dirty', color: '#069550', size: 'xs', class: 'q-pt-sm' },
        {
          val: 'OD',
          label: 'Occupied Dirty',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-sm'
        },
        {
          val: 'OC',
          label: 'Occupied Clean',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-sm'
        },
        { val: 'ED', label: 'Expected Departure', color: '#069550', size: 'xs', class: 'q-pt-sm' },
        { val: 'DnD', label: 'Do not Disturb', color: '#069550', size: 'xs', class: 'q-pt-sm' },
        { val: 'OOO', label: 'Out of Order', color: '#069550', size: 'xs', class: 'q-pt-sm' },
        { val: 'OM', label: 'Out of Market', color: '#069550', size: 'xs', class: 'q-pt-sm' },
        { val: 'HU', label: 'House Use', color: '#069550', size: 'xs', class: 'q-pt-sm' }
      ],
      api: new this.$Api('housekeeping'),
      paginationRoom: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      paginationTask: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    filterDisplay(newOption) {
      // Update the label based on the selected option
      this.updateFilterDisplayLabel(newOption)
    }
  },
  methods: {
    handleRefresh() {
      this.refreshData()

      this.postStatus()
    },
    postStatus() {
      let url = `status/${this.idRoom}/${this.status}`
      this.api.post(url, null, ({ status }) => {
        if (status == 200) {
          this.refreshData()

          this.$q.notify({
            type: 'positive',
            message: 'Update successfully.',
            timeout: 1000
          })
        }
      })
    },
    refreshData() {
      window.location.reload()
    },
    handleClick(id) {
      this.idRoom = id
      this.$q.notify({
        type: 'positive',
        message: 'Get data successfully.',
        timeout: 1000
      })
    },
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.updateFilterDisplayLabel(option)
      this.fetchData()
    },
    updateFilterDisplayLabel(option) {
      // Logic to update the label based on the selected option
      switch (option) {
        case 'roomNum':
          this.filterDisplayLabel = 'Room Number'
          break
        case 'roomType':
          this.filterDisplayLabel = 'Room Type'
          break
        case 'bedType':
          this.filterDisplayLabel = 'Bed Type'
          break
        case null:
          this.filterDisplayLabel = 'All'
          break
        // Add other cases as needed
        default:
          this.filterDisplayLabel = 'Default Label'
      }
    },
    onPaginationChangeRoom(props) {
      this.paginationRoom = props.paginationRoom
      this.fetchData()
    },
    onPaginationChangeTask(props) {
      this.paginationTask = props.paginationTask
      this.fetchData()
    },
    fetchData() {
      this.loading = true

      let url = `status?roomPage=${this.paginationRoom.page}`

      if (this.filterDisplay !== null) {
        url += `&roomSortOrder=${this.filterDisplay}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { roomStatus, taskData, latestChange } = data

          this.statusRoom = latestChange.roomStatus.longDescription
          this.statusRoomNo = latestChange.id

          console.log(this.statusRoomNo)

          this.dataRows = roomStatus.map((rs) => ({
            roomno: rs.id,
            roomtype: rs.roomType,
            btype: rs.bedSetup,
            statusdescription: rs.roomStatus.longDescription
          }))

          this.dataRows2 = taskData.map((td) => ({
            roomno: td.roomId,
            Request: td.request,
            PIC: td.roomMaid.user.name,
            Status: td.mainStatus
          }))
        }
      })
    }
  }
})
</script>
<style>
.q-field--auto-height.q-field--dense .q-field__control {
  border-radius: 10px;
}

.ambatukam {
  display: flex;
  justify-content: space-between;
  align-items: end;
  column-gap: 16px;
}
.rstatus {
  margin-top: 5px;
  font-size: 20px;
}

@media only screen and (max-width: 400px) {
  .ambasing {
    width: 80vw;
  }

  .ambatukam {
    width: 100%;
  }
  .rstatus {
    font-size: 17px;
  }
}
@media only screen and (max-width: 380px) {
  .rstatus {
    font-size: 15px;
    margin-top: 10px;
  }
}
</style>
