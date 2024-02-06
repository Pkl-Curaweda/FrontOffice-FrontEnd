<template>
  <q-page class="column q-py-lg q-px-lg" style="row-gap: 40px">
    <!-- Top Side -->
    <div
      class="flex"
      style="column-gap: 24px; width: 100%"
      :style="$q.screen.lt.md ? 'flex-direction: column' : ''"
    >
      <!-- Pie Chart (Mobile) -->
      <HKChart
        v-if="$q.screen.lt.md"
        ref="hkChartMobile"
        :series="series"
        :options="chartOptions"
        class="mobileChart"
      />

      <!-- Pie Chart (Desktop) -->
      <div style="flex: 1 1 0%">
        <HKChart ref="hkChartDesktop" :series="series" :options="chartOptions" />
      </div>

      <!-- Found & Lost -->
      <div
        class="flex"
        style="flex: 1 1 0%; gap: 24px; flex-wrap: nowrap"
        :style="$q.screen.lt.sm ? 'flex-direction: column;' : ''"
      >
        <HKCard
          card_class="column items-center justify-end q-py-xl relative"
          card_style="height: 20rem; flex: 1 1 0%; flex-wrap: nowrap;"
          radius="10px"
        >
          <p style="font-size: 7.5rem; line-height: 6.5rem">{{ found || 0 }}</p>
          <p style="font-size: 1.5rem; margin: 0; font-weight: bold">Found</p>

          <div
            class="absolute"
            style="
              top: 16px;
              left: 16px;
              background-color: #069550;
              border-radius: 50%;
              color: white;
              padding: 8px;
            "
          >
            <q-icon name="o_check_circle" size="24px" />
          </div>
        </HKCard>
        <HKCard
          card_class="column items-center justify-end q-py-xl relative"
          card_style="height: 20rem; flex: 1 1 0%; flex-wrap: nowrap;"
          radius="10px"
        >
          <p style="font-size: 7.5rem; line-height: 6.5rem">{{ lost || 0 }}</p>
          <p style="font-size: 1.5rem; margin: 0; font-weight: bold">Lost</p>

          <div
            class="absolute"
            style="
              top: 16px;
              left: 16px;
              background-color: #069550;
              border-radius: 50%;
              color: white;
              padding: 8px;
            "
          >
            <q-icon name="o_cancel" size="24px" />
          </div>
        </HKCard>
      </div>
    </div>

    <!-- Table -->
    <div style="width: 100%" class="lostFoundTable">
      <!-- Filtering -->
      <div class="flex q-mb-sm justify-between" style="gap: 16px">
        <div class="flex" style="gap: 16px">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Sorting :</span>
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
                <q-item clickable v-close-popup @click="setFilterDisplay('roomNum', 'Room Number')">
                  <q-item-section>Room Number</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('pic', 'PIC')">
                  <q-item-section>PIC</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="setFilterDisplay('reported', 'Reported By')"
                >
                  <q-item-section>Reported By</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('', 'Guest Name')">
                  <q-item-section>Guest Name</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="setFilterDisplay('', 'Location')">
                  <q-item-section>Location</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>

          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 16px; font-weight: 500">Date :</span>
            <HKDateInput />
          </div>
        </div>

        <div>
          <q-input
            outlined
            dense
            v-model="searchModel"
            class="input-border"
            label="Item Description"
            style="width: fit-content"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        square
        :table-header-style="{
          backgroundColor: '#069550',
          color: '#ffffff',
          padding: '10px'
        }"
        :card-style="{ boxShadow: 'none' }"
        rows-per-page-label="Show"
        :dense="$q.screen.lt.md"
        v-model:pagination="pagination"
        @request="onPaginationChange"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="date">
              {{ props.row.date }}
            </q-td>
            <q-td key="time">
              {{ props.row.time }}
            </q-td>
            <q-td key="room_no">
              {{ props.row.room_no }}
            </q-td>
            <q-td key="pic">
              {{ props.row.pic }}
            </q-td>
            <q-td key="item_desc">
              {{ props.row.item_desc }}
            </q-td>
            <q-td key="reported_by">
              {{ props.row.reported_by }}
            </q-td>
            <q-td key="phone_no">
              {{ props.row.phone_no }}
            </q-td>
            <q-td key="reported_date">
              {{ props.row.reported_date }}
            </q-td>
            <q-td key="location">
              {{ props.row.location }}
            </q-td>
            <q-td key="image">
              <!-- View IMG BTN -->
              <q-btn
                @click="props.row.dialogActive = true"
                flat
                no-caps
                dense
                style="border-radius: 4px; border: 1px solid #d9d9d9"
              >
                <div class="flex" style="flex-wrap: nowrap; gap: 4px; padding: 0 4px">
                  <q-icon name="o_image" color="primary" />
                  <span style="color: black">View</span>
                </div>
              </q-btn>

              <!-- Modal -->
              <q-dialog v-model="props.row.dialogActive">
                <q-card style="max-width: 100vw; max-height: 90vh; border-radius: 20px">
                  <q-card-section class="text-h6" style="padding-inline: 24px"
                    >View Image</q-card-section
                  >
                  <q-img
                    :src="props.row.image"
                    spinner-color="primary"
                    :ratio="16 / 9"
                    style="border-radius: 0px"
                    fit="contain"
                    :style="$q.screen.lt.sm ? 'width: 85vw;' : 'width: 65vw; margin: 24px;'"
                  />
                </q-card>
              </q-dialog>
            </q-td>
            <q-td key="action" style="width: 10px">
              <q-btn flat size="13px" style="color: #008444"
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
              <q-btn flat size="13px" style="color: #269861"
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
  </q-page>
</template>

<script>
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKDateInput from 'src/components/HK/Form/HKDateInput.vue'
import HKChart from 'src/components/charts/HKChart.vue'
import { defineComponent, ref } from 'vue'

const columns = [
  {
    name: 'date',
    label: 'Date',
    field: 'date',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'time',
    label: 'Time',
    field: 'time',
    align: 'left',
    sortable: true
  },
  {
    name: 'roomNo',
    label: 'Room No.',
    field: 'room_no',
    align: 'left',
    sortable: true
  },
  {
    name: 'pic',
    label: 'PIC',
    field: 'pic',
    align: 'left',
    sortable: true
  },
  {
    name: 'itemDesc',
    label: 'Item Description',
    field: 'item_desc',
    sortable: true,
    align: 'left'
  },
  {
    name: 'reportedBy',
    label: 'Reported By',
    field: 'reported_by',
    sortable: true,
    align: 'left'
  },
  {
    name: 'phoneNo',
    label: 'Phone No.',
    field: 'phone_no',
    sortable: true,
    align: 'left'
  },
  {
    name: 'reportedDate',
    label: 'Reported Date',
    field: 'reported_date',
    sortable: true,
    align: 'left'
  },
  {
    name: 'location',
    label: 'Location',
    field: 'location',
    sortable: true,
    align: 'left'
  },
  {
    name: 'image',
    label: 'Image',
    field: 'image',
    align: 'center'
  },
  {
    name: 'action',
    label: 'Action',
    field: 'action',
    align: 'center'
  }
]
const chartOptions = {
  chart: {
    type: 'donut'
  },
  dataLabels: {
    enabled: false
  },

  colors: ['#364E30', '#8BAA84'],
  labels: ['Lost', 'Found'],
  legend: {
    offsetY: 55,
    fontSize: '20px',
    fontWeight: 400,
    markers: {
      width: '20px',
      height: '20px',
      offsetX: -5
    },
    itemMargin: {
      horizontal: 0,
      vertical: 10
    }
  },
  responsive: [
    {
      breakpoint: 1180,
      options: {
        legend: {
          position: 'bottom',
          offsetY: 0,
          fontSize: '16px',
          fontWeight: 400,
          markers: {
            width: '20px',
            height: '20px',
            offsetX: -5
          },
          itemMargin: {
            horizontal: 10
          }
        }
      }
    }
  ]
}

export default defineComponent({
  name: 'LostAndFoundPage',
  components: {
    HKChart,
    HKCard,
    HKDateInput
  },
  setup() {
    return {
      loading: ref(false),
      filterDisplay: ref('roomNum'),
      filterDisplayLabel: ref('Room Number'),
      sortingModel: ref('Room Number'),
      sortingOptions: ['Room Number', 'Reservation Number', 'Room Type', 'Guest Name'],
      searchModel: ref(''),
      seriesEntry: ref([]),
      found: ref(),
      lost: ref(),
      rows: ref(),
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping'),
      chartOptions,
      columns,
      startUp: true,
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      series: this.seriesEntry
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
    updateFilterDisplayLabel(option) {
      // Logic to update the label based on the selected option
      switch (option) {
        case 'roomNum':
          this.filterDisplayLabel = 'Room Number'
          break
        case 'pic':
          this.filterDisplayLabel = 'PIC'
          break
        case 'reported':
          this.filterDisplayLabel = 'Reported By'
          break
        case '':
          this.filterDisplayLabel = 'Guest Name'
          break
        case '':
          this.filterDisplayLabel = 'Location'
          break
        // Add other cases as needed
        default:
          this.filterDisplayLabel = 'Default Label'
      }
    },
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.updateFilterDisplayLabel(option)
      this.fetchData()
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      if(this.startUp != false){
        this.startUp = false
        this.fetchData()
      }
      
      let url = `lostfound?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`
      if (this.filterDisplay !== null) url += `&sortOrder=${this.filterDisplay}`

      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          console.log(this.series)
          const { graph, lostFounds } = data // Ambil objek graph dari respons
          this.found = graph.found
          this.lost = graph.lost
          this.graph(this.found, this.lost)
          this.rows = lostFounds.map((lostFound) => ({
            name: lostFound.roomId,
            date: new Date(lostFound.created_at).toLocaleDateString(),
            time: lostFound.time,
            room_no: lostFound.roomId,
            pic: lostFound.pic.name,
            item_desc: lostFound.description,
            reported_by: lostFound.user.name,
            phone_no: lostFound.user.phone,
            reported_date: new Date(lostFound.reportedDate).toLocaleDateString(),
            location: lostFound.location,
            image: lostFound.image,
            action: ['edit', 'delete'],
            dialogActive: false
          }))
        }
      })
    },
    graph(found = 0, lost = 0) {
      const data = [found, lost]
      this.seriesEntry = data
      console.log(this.chartSeries)
      this.$refs.hkChartDesktop.updateSeries(data)
      this.$refs.hkChartMobile.updateSeries(data)
    }
  }
})
</script>

<style>
.lostFoundTable .q-table th {
  border-top-width: 0;
  border-right-width: 4px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}
.lostFoundTable .q-table tbody td {
  font-size: 14px;
  border-right: 4px solid white;
}
.lostFoundTable .q-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}
.lostFoundTable .q-table__bottom {
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  border-width: 2px;
  border-right-width: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-color: #069550;
  background: #fafafa;
}
.lostFoundTable .q-table__control:nth-child(2) {
  position: absolute;
}
.lostFoundTable .q-table__bottom .q-btn .q-icon {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #069550;
}
.lostFoundTable .disabled * {
  opacity: 0;
}

.input-border .q-field__control::before {
  border-color: #d9d9d9 !important;
}
.input-border .q-field__label {
  color: black;
}

@media (max-width: 600px) {
  .mobileChart div {
    max-height: 600px;
  }
  @media (max-width: 500px) {
    .mobileChart div {
      max-height: 500px;
    }
    @media (max-width: 400px) {
      .mobileChart div {
        max-height: 400px;
      }
    }
  }
}
</style>
