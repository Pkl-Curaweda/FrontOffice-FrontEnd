<template>
  <q-page style="overflow-y: hidden; min-width: max-content">
    <FOMenubar>
      <template #left>
        <!--Sorting Dropdown-->
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          label="Sorting"
          dropdown-icon="o_expand_more"
        >
          <!--Konten Dropdown-->
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>Deluxe</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Standard</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Family </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>101-110</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>110-101</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Twin Bed</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>King Bed</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Single Bed</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-separator vertical />

        <!--Search Button-->
        <q-input v-model="searchInput" borderless label="Name" type="search">
          <template v-slot:prepend>
            <q-icon name="search" class="q-ml-sm" color="primary" />
          </template>
        </q-input>
        <q-separator vertical />

        <!-- date picker  -->
        <q-btn-dropdown
          flat
          square
          range
          class="text-capitalize"
          label="TDate - FDate"
          icon="o_event"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
        </q-btn-dropdown>
        <!---->
        <q-separator vertical />

        <!--Display Option-->
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          label="Display Option"
          dropdown-icon="o_expand_more"
        >
          <select id="bahasaDropdown">
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>

          <q-option-group :options="radioOptions" type="radio" v-model="radioInput" />
        </q-btn-dropdown>
      </template>
    </FOMenubar>
    <q-separator> </q-separator>
    <MultiPane>
      <template #upper>
        <!--Table-->
        <!--Table-->
        <div class="my-table">
          <q-table class="no-shadow" :rows="rows" :columns="columns" row-key="name">
            <template v-slot:thead="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
                <q-th style="width: 10px" :props="props"></q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="(cell, i) in props.row" :key="i" :style="cell.style">
                  {{ cell.data }}
                </q-td>
                <q-td key="" :props="props" style="width: 10px">
                  <q-btn flat rounded size="13px" style="color: #008444"
                    ><svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- SVG path for the first button -->
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
                      <!-- SVG path for the second button -->
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
import { defineComponent } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import GuestForm from './fragments/GuestForm.vue'
import { allObjectsInArray } from 'src/utils/datatype'

export default defineComponent({
  name: 'RoomAvailabilityPage',
  components: { FOMenubar, MultiPane, GuestForm },
  setup() {
    return {
      datePicker: { from: null, to: null },
      columns: [
        { name: 'room', label: '', field: 'room', align: 'left' },
        { name: 'averageroom', label: 'Average Room Occ (%)', align: 'left', field: 'averageroom' }
      ],
      rows: [
        { room: { data: '101 - DLX - K', style: {} } },
        { room: { data: '102 - DLX - K', style: {} } },
        { room: { data: '103 - DLX - K', style: {} } },
        { room: { data: '104 - DLX - K', style: {} } },
        { room: { data: '105 - DLX - K', style: {} } },
        { room: { data: '106 - DLX - K', style: {} } },
        { room: { data: '107 - DLX - K', style: {} } },
        { room: { data: '108 - DLX - K', style: {} } },
        { room: { data: '109 - DLX - K', style: {} } },
        { room: { data: '110 - DLX - K', style: {} } }
      ],

      allObjectsInArray
    }
  },
  data() {
    return {
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
        // Add logic to update the table data based on filters if needed
      },
      deep: true
    }
    // Watch for changes in the 'pagination' property and fetch data accordingly
  },
  methods: {
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    fetchData() {
      this.loading = true

      let url = `roomavail?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          this.formatData(data.logData)
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

      raw.forEach((ra) => {
        list.push({
          name: 'date',
          label: ra.date,
          field: 'date',
          align: 'left',

          date: { data: ra.roomHistory.room_1.guestName }
        })
      })
      this.data = list
    }
  }
})
</script>
