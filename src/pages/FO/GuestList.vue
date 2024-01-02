<template>
  <q-page
    class="column"
    style="
      overflow-y: hidden;
      width: 100%;
      min-width: max-content;
      min-height: calc(100vh - 51.25px);
    "
  >
    <FOMenubar>
      <template #left>
        <div style="height: 100%; justify-content: center;">
          <q-input v-model="searchInput" borderless label="Name" type="search" style="display: flex; justify-content: center;">
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>

        <q-separator vertical />

        <q-btn-dropdown
          flat
          square
          class="text-capitalize date-btn text-black"
          label="TDate - FDate"
          icon="o_event"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
        </q-btn-dropdown>

        <q-separator vertical />

        <q-btn-dropdown
          flat
          square
          class="text-capitalize text-black"
          label="Display Option"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <q-option-group :options="filterDisplayOptions" type="radio" v-model="filterDisplay" />
        </q-btn-dropdown>
      </template>
      <template #right>
        <q-separator vertical />
        <q-btn flat square color="primary" icon="pending_actions">
          <q-tooltip>Pending</q-tooltip>
        </q-btn>
      </template>
    </FOMenubar>

    <MultiPane>
      <template #upper>
        <div class="my-table">
          <q-table
            class="no-shadow"
            v-model:pagination="pagination"
            @request="onPaginationChange"
            :rows="data"
            :loading="loading"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:header="props">
              <q-tr class="table-head" :props="props">
                <q-th
                  v-for="(col, i) in props.cols"
                  :key="i"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <q-select
                    v-if="filterColumns.hasOwnProperty(col.name)"
                    clearable
                    borderless
                    dark
                    label-color="white"
                    style="min-width: 90px"
                    v-model="filterColumns[col.name].data"
                    :options="filterColumns[col.name].options"
                    :label="col.label"
                  >
                    <template
                      v-if="allObjectsInArray(filterColumns[col.name].options)"
                      v-slot:option="scope"
                    >
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <div class="flex">
                            <q-icon
                              size="20px"
                              v-for="(ic, k) in scope.opt.icons"
                              :key="k"
                              :name="ic"
                            />
                            <q-item-label class="q-ml-sm">{{ scope.opt.label }}</q-item-label>
                          </div>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <span v-else class="text-h6">{{ col.label }}</span>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <template v-for="(cell, key, i) in props.row" :key="i">
                  <q-td v-if="!['ResRoomNo', 'RoomBoy'].includes(key)" :style="cell.style">
                    {{ cell.data }}
                  </q-td>
                  <q-td v-if="['RoomBoy'].includes(key)" :style="cell.style">
                    <q-avatar
                      v-for="(rb, i) in cell.data"
                      :key="i"
                      size="40px"
                      class="overlapping"
                      :style="`left: ${i * 25}px`"
                    >
                      <img :src="rb.user.picture" />
                    </q-avatar>
                  </q-td>
                </template>
                <q-td key="" :props="props" style="width: 10px">
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    @click="setRoomResv(props.row)"
                    style="color: #008444"
                    ><svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 13C8.8 13 9.57 12.93 10.31 12.82L13.22 9.91C11.89 10.59 10 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.13L15.39 7.74C15.57 7.56 15.78 7.42 16 7.3V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.04 3.06 17.72 7 17.97V16.13L7.17 15.96C3.84 15.76 2 14.46 2 14V11.77C3.61 12.55 5.72 13 8 13ZM8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2ZM15.13 10.83L17.17 12.87L11.04 19H9V16.96L15.13 10.83ZM18.85 11.19L17.87 12.17L15.83 10.13L16.81 9.15C17 8.95 17.33 8.95 17.53 9.15L18.85 10.47C19.05 10.67 19.05 11 18.85 11.19Z"
                        fill="#008444"
                      />
                    </svg>
                  </q-btn>
                  <q-btn flat rounded size="13px" style="color: #269861"
                    ><svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 10.59V4.5C16 2.29 12.42 0.5 8 0.5C3.58 0.5 0 2.29 0 4.5V14.5C0 16.71 3.59 18.5 8 18.5C8.46 18.5 8.9 18.5 9.33 18.44C9.1129 17.8162 9.00137 17.1605 9 16.5V16.45C8.68 16.5 8.35 16.5 8 16.5C4.13 16.5 2 15 2 14.5V12.27C3.61 13.05 5.72 13.5 8 13.5C8.65 13.5 9.27 13.46 9.88 13.39C10.4127 12.5085 11.1638 11.7794 12.0607 11.2731C12.9577 10.7668 13.9701 10.5005 15 10.5C15.34 10.5 15.67 10.54 16 10.59ZM14 9.95C12.7 10.9 10.42 11.5 8 11.5C5.58 11.5 3.3 10.9 2 9.95V7.14C3.47 7.97 5.61 8.5 8 8.5C10.39 8.5 12.53 7.97 14 7.14V9.95ZM8 6.5C4.13 6.5 2 5 2 4.5C2 4 4.13 2.5 8 2.5C11.87 2.5 14 4 14 4.5C14 5 11.87 6.5 8 6.5ZM19 15.5V17.5H11V15.5H19Z"
                        fill="#269861"
                      />
                    </svg>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
      <template #lower>
        <GuestForm />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import GuestForm from 'src/pages/FO/fragments/GuestForm.vue'
import { formatDate } from 'src/utils/time'
import { defineComponent, ref, watch } from 'vue'
import { allObjectsInArray } from 'src/utils/datatype'

export default defineComponent({
  name: 'GuestList',
  components: { FOMenubar, MultiPane, GuestForm },
  setup() {
    return {
      allObjectsInArray,
      loading: ref(false),
      searchInput: ref(''),
      datePicker: ref({ from: '', to: '' }),
      filterDisplay: ref(null),
      filterDisplayOptions: [
        { label: 'All', value: null },
        { label: 'Reservation', value: 'reservation' },
        { label: 'In-House Guest', value: 'inhouse' },
        { label: 'Arrival-Today', value: 'arrival' },
        { label: 'Depart-Today', value: 'departure' }
      ],
      columns: [
        { name: 'ResNo', label: 'ResNo', align: 'left', field: 'ResNo' },
        { name: 'ResResource', label: 'ResResource', align: 'left', field: 'ResResource' },
        { name: 'RmNo', label: 'RmNo', align: 'left', field: 'RmNo' },
        { name: 'RType', label: 'RType', align: 'left', field: 'RType' },
        { name: 'BType', label: 'BType', align: 'left', field: 'BType' },
        { name: 'GuestName', label: 'GuestName', align: 'left', field: 'GuestName' },
        { name: 'Arr', label: 'Arr', field: 'Arr', align: 'left' },
        { name: 'Arrival', label: 'Arrival', align: 'left', field: 'Arrival' },
        { name: 'Depart', label: 'Depart', align: 'left', field: 'Depart' },
        { name: 'Night', label: 'Night', align: 'left', field: 'Night' },
        { name: 'RoomBoy', label: 'RoomBoy', align: 'left', field: 'RoomBoy' },
        { name: 'RoomRate', label: 'RoomRate', align: 'left', field: 'RoomRate' },
        { name: 'CreatedDate', label: 'CreatedDate', align: 'left', field: 'CreatedDate' },
        { name: '', label: '', align: 'center', field: '' }
      ]
    }
  },
  data() {
    return {
      filterColumns: {
        ResNo: {
          data: '',
          options: ['Newest', 'Oldest']
        },
        ResResource: {
          data: '',
          options: ['Whatsapp', 'Walk-In']
        },
        RmNo: {
          data: '',
          options: ['101-110', '110-101', 'Guaranted', '6 PM', 'Tentative']
        },
        RType: {
          data: '',
          options: ['DLX', 'STD', 'FML']
        },
        BType: {
          data: '',
          options: [
            {
              icons: ['o_king_bed'],
              label: 'King bed',
              value: 'King bed'
            },
            {
              icons: ['o_single_bed', 'o_single_bed'],
              label: 'Twin bed',
              value: 'Twin bed'
            },
            {
              icons: ['o_single_bed'],
              label: 'Single bed',
              value: 'Single bed'
            }
          ]
        },
        GuestName: {
          data: '',
          options: ['A-Z', 'Z-A']
        },
        Arr: {
          data: '',
          options: ['RB', 'RO']
        },
        Arrival: {
          data: '',
          options: ['Newest', 'Oldest']
        },
        Depart: {
          data: '',
          options: ['Newest', 'Oldest']
        },
        Night: {
          data: '',
          options: ['1', '>1']
        },
        RoomBoy: {
          data: '',
          options: ['ILYAS', 'RONI', 'YUTA', 'HERTIAMAN']
        },
        RoomRate: {
          data: '',
          options: ['High Price', 'Low Price']
        },
        CreatedDate: {
          data: '',
          options: ['Newest', 'Oldest']
        }
      },
      api: new this.$Api('frontoffice'),
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      data: []
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    filterColumns: {
      handler(filters) {
        console.log(filters)
      },
      deep: true
    },
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    }
  },
  methods: {
    setRoomResv(data) {
      this.$ResvStore.currentResvId = data['ResNo'].data
      this.$ResvStore.currentRoomResvId = data['ResRoomNo'].data
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    fetchData() {
      this.loading = true

      let url = `/page/arrival?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`

      if (this.filterDisplay !== null) url += `&disOpt=${this.filterDisplay}`

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.reservations)
          this.pagination = {
            page: data.meta?.currPage,
            rowsNumber: data.meta?.total,
            rowsPerPage: data.meta?.perPage
          }
        }
      })
    },
    formatData(raw = []) {
      const list = []

      raw.forEach((rsrv) => {
        rsrv.reservation.forEach((rr) => {
          list.push({
            ResNo: { data: rsrv.reservationId, style: {} },
            ResRoomNo: { data: rr.id, style: {} },
            ResResource: { data: rr.reservation.reserver.resourceName, style: {} },
            RmNo: {
              data: rr.room.id,
              style: {
                backgroundColor: rr.reservation.resvStatus.rowColor,
                textColor: rr.reservation.resvStatus.textColor
              }
            },
            RType: { data: rr.room.roomType, style: {} },
            BType: { data: rr.room.bedSetup, style: {} },
            GuestName: { data: rr.reservation.reserver.guest.name, style: {} },
            Arr: { data: rr.arrangment.id, style: {} },
            Arrival: { data: formatDate(rr.reservation.arrivalDate), style: {} },
            Depart: { data: formatDate(rr.reservation.departureDate), style: {} },
            Night: { data: rr.reservation.manyNight, style: {} },
            RoomBoy: { data: rr.roomMaids, style: {} },
            RoomRate: { data: rr.arrangment.rate, style: {} },
            CreatedDate: { data: formatDate(rr.reservation.created_at), style: {} }
          })
        })
      })
      this.data = list
    }
  }
})
</script>

<style scoped></style>
