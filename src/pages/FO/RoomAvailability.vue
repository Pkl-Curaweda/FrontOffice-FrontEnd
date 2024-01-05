<template>
  <q-page class="column" style="overflow-y: hidden; min-width: max-content">
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
        <q-input v-model="searchInput" borderless dense label="Name" type="search">
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
  data() {
    return {
      datePicker: { from: null, to: null },
      columns: [
        { name: 'room', label: '', field: 'room' },
        { name: 'averageroom', label: 'Average Room Occ (%)', align: 'left', field: 'averageroom' }
      ],
      rows: [],
      allObjectsInArray
    }
  },
  watch: {
    datePicker(newDate) {
      // Pastikan bahwa newDate diinisiasi dengan benar
      // Call the method to update columns and rows based on the selected date
      this.updateTable(newDate)
    }
  },

  methods: {
    updateTable(newDate) {
      // Check if both 'from' and 'to' dates are selected
      if (newDate.from && newDate.to) {
        // Parse 'from' and 'to' dates
        const startDate = new Date(newDate.from)
        const endDate = new Date(newDate.to)

        // Calculate the number of days between 'from' and 'to' (inclusive)
        const timeDifference = endDate.getTime() - startDate.getTime()
        const numberOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1 // Add 1 to include the last day

        // Update column values with dynamic date labels
        const newColumns = [
          { name: 'room', label: '', field: 'room' },
          ...Array.from({ length: numberOfDays }, (_, index) => {
            const currentDate = new Date(startDate.getTime() + index * (24 * 60 * 60 * 1000))
            const label = currentDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            }) // This will result in a format like '23/12/23'

            return {
              name: `date${index + 1}`,
              label: `${label}`,
              align: 'left',
              field: `date${index + 1}`
            }
          }),
          {
            name: 'averageroom',
            label: 'Average Room Occ (%)',
            align: 'left',
            field: 'averageroom'
          }
        ]

        this.columns = newColumns

        // Example: Update rows based on the newDate (customize this logic as needed)
        this.rows = this.rows.map((row) => {
          const updatedRow = {
            room: row.room, // Make sure to include the room data
            averageroom: row.averageroom // Make sure to include the averageroom data
          }

          // Add/update date fields in the row
          Array.from({ length: numberOfDays }, (_, index) => {
            const currentDate = new Date(startDate.getTime() + index * (24 * 60 * 60 * 1000))
            const fieldName = `date${index + 1}`
            const formattedDate = currentDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            })

            if (row.room === 1) {
              // Customize cell content and style for room 1
              if (formattedDate === 'your target date') {
                // Customize content and style for the specific date
                updatedRow[fieldName] = {
                  data: 'DENI KUSNANDAR',
                  style: { backgroundColor: 'red', color: 'white' }
                }
              } else {
                // Set default content and style for other dates
                updatedRow[fieldName] = {
                  data: 'Other Data',
                  style: { backgroundColor: 'default-color', color: 'default-color' }
                }
              }
            } else {
              // Set default content and style for other rooms
              updatedRow[fieldName] = {
                data: 'Other Data',
                style: { backgroundColor: 'default-color', color: 'default-color' }
              }
            }
          })

          return updatedRow
        })
      }
    }
  }
})
</script>
