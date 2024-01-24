<template>
  <q-page class="q-pa-lg">
    <div class="q-gutter">
      <div class="row q-gutter-lg flex-center flex">
        <div class="row">
          <HKCard card_class="ambasing" radius="10px">
            <div class="column">
              <div
                class="q-px-md q-pt-sm q-gutter-x-md"
                style="min-width: 200px; display: flex; flex-wrap: wrap; align-items: center"
              >
                <label for="display" class="q-mt-md text-weight-bold text-body2" style="width: 10%"
                  >Sorting</label
                >
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

              <div class="tableComp q-mt-sm flex flex-center full-width">
                <q-table
                  :rows="dataRows"
                  :columns="dataColumns"
                  row-key="name"
                  square
                  class="q-pa-md full-width"
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
                      <q-td key="room-no" :props="props">
                        {{ props.row.roomno }}
                      </q-td>
                      <q-td key="roomtype" :props="props">
                        {{ props.row.roomtype }}
                      </q-td>
                      <q-td key="btype" :props="props">
                        {{ props.row.btype }}
                      </q-td>
                      <q-td key="statusdescription" :props="props">
                        {{ props.row.statusdescription }}
                      </q-td>
                      <q-td key="st" :props="props">
                        {{ props.row.st }}
                      </q-td>
                      <q-td key="statusdesc" :props="props">
                        {{ props.row.statusdesc }}
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
            <HKCard
              card_class="column ambasing"
              card_style="flex-grow:1; height: fit-content;"
              radius="20px"
            >
              <div class="row q-pa-xl justify-between q-gutter-md">
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
                <div class="column flex items-center" style="margin-top: 10%">
                  <div class="row">
                    <p class="text-weight-bold text-body1 q-mt-sm">Room No</p>
                    <div class="" style="width: 60px; height: 30px; background-color: white">
                      <q-btn-dropdown
                        dropdown-icon="n"
                        label=""
                        class="q-mx-md text-weight-bold flex items-center"
                        style="width: 100%"
                        push
                      ></q-btn-dropdown>
                    </div>
                  </div>
                  <q-btn
                    label="Change Status"
                    style="border-radius: 10px; width: 160px; background-color: #81bb78"
                    color=""
                    class="text-weight-bold"
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
                class="col text-center flex flex-center text-weight-bold"
                style="
                  background-color: #81bb78;
                  border-right: 1px solid black;
                  height: 40px;
                  border-top-left-radius: 5px;
                  border-bottom-left-radius: 5px;
                "
              >
                03
              </div>
              <div
                class="col-7 text-center flex flex-center text-weight-bold"
                style="
                  background-color: #81bb78;
                  height: 40px;
                  border-top-right-radius: 5px;
                  border-bottom-right-radius: 5px;
                "
              >
                Occupied Dirty
              </div>
            </div>
          </div>
          <div class="ambasing">
            <div class="row">
              <div
                style="background-color: #069550"
                class="text-weight-bold flex flex-center col-12"
              >
                <div class="flex flex-center text-white col q-ml-xl">Queuing Rooms</div>
                <q-btn label="" flat round size="" class="q-ml-auto"
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
                style="margin-top: 2px"
                square
                class="full-width"
                :table-header-style="{
                  backgroundColor: '#069550',
                  color: '#ffffff',
                  padding: '10px'
                }"
                :card-style="{ boxShadow: 'none' }"
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
import HKTable from 'src/components/HK/Table/HKTable.vue'
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
    const status = ref('cleanChecked')
    return {
      dataColumns,
      dataColumns2,
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
          val: 'cleanChecked',
          label: 'Clean Checked',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-md'
        },
        {
          val: 'cleanUnchecked',
          label: 'Clean Unchecked',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-sm'
        },
        { val: 'dirty', label: 'Dirty', color: '#069550', size: 'xs', class: 'q-pt-sm' },
        {
          val: 'doNotDisturb',
          label: 'Do not Disturb',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-sm'
        },
        {
          val: 'outOfOrder',
          label: 'Out of Order',
          color: '#069550',
          size: 'xs',
          class: 'q-pt-sm'
        },
        { val: 'offMarket', label: 'Off Market', color: '#069550', size: 'xs', class: 'q-pt-sm' }
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
          const { roomStatus, taskData } = data

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
  width: 80%;
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
