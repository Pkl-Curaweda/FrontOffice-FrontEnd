<template>
  <div class="spv full-width">
    <div class="q-mt-lg q-pl-md">
      <UserGreet name="Aldi Rahadian" role="Supervisor" />
    </div>
    <div class="q-mt-md q-pl-md">
      <IMPPSSelectedTable
        :rows="rows"
        :columns="columns"
        title="Task Queue"
        @getTableData="getTableData"
        isSelect
        btnEdit
      />
    </div>
    <q-form class="q-mt-md">
      <div class="q-mx-auto q-mt-lg" style="width: fit-content; min-width: 100px">
        <div class="row items-center q-gutter-sm">
          <q-btn
            dense
            noCaps
            color="primary"
            label="OK"
            class="q-px-lg"
            style="border-radius: 10px"
          />
          <q-btn
            dense
            noCaps
            color="primary"
            label="Re-Clean"
            class="q-px-lg"
            style="border-radius: 10px"
          />
        </div>
        <div class="q-mt-sm">
          <q-btn
            dense
            noCaps
            color="primary"
            label="Change Status"
            class="q-px-lg full-width"
            style="border-radius: 10px"
          >
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-card
                class="q-pa-md q-mt-md"
                style="width: 300px; min-width: 200px; border-radius: 10px"
              >
                <q-card-section>
                  <div class="text-body2 text-weight-bold">Change Status to :</div>
                  <div class="q-mt-md">
                    <q-option-group :options="options" type="radio" v-model="group" />
                  </div>
                  <div class="q-mx-auto q-mt-md" style="width: fit-content">
                    <q-btn
                      dense
                      class="text-body1 q-px-md q-py-none"
                      label="Change Status"
                      color="primary"
                      noCaps
                      style="border-radius: 8px"
                      v-close-popup
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-popup-proxy>
          </q-btn>
        </div>
      </div>
      <div class="q-mt-lg q-mx-auto" style="width: fit-content">
        <div>
          <div>Comments</div>
          <q-input filled dense placeholder="Notes..." class="spv-input" type="textarea" />
        </div>
        <div class="row items-center justify-end q-mt-sm">
          <q-btn
            dense
            class="text-body1 q-px-md q-py-none"
            label="Submit"
            type="submit"
            color="primary"
            noCaps
            style="border-radius: 8px"
          />
        </div>
      </div>
    </q-form>
    <div class="rating q-mt-lg q-px-md">
      <div class="row items-center q-gutter-sm">
        <div class="text-body1 text-weight-bold">Give rating for room boy!</div>
        <q-icon name="sentiment_satisfied" size="24px" color="yellow-8" />
      </div>
      <div class="row items-center q-gutter-md q-mt-sm q-mb-xl">
        <div class="q-pa-sm" style="background-color: #ffebc0; border-radius: 4px">
          <div class="text-body2" style="color: #98690c">Feedback</div>
        </div>
        <div class="row items-center">
          <q-icon
            v-for="(star, index) in maxRating"
            :key="index"
            :name="getStarIcon(index)"
            size="45px"
            :color="getStarColor(index)"
            @click="setRating(index + 1)"
            style="cursor: pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserGreet from 'src/components/HK/IMPPS/General/UserGreet.vue'
import IMPPSSelectedTable from 'src/components/HK/IMPPS/Table/SelectedTable.vue'
import { ref } from 'vue'

const columns = [
  {
    name: 'roomNo',
    required: true,
    label: 'Room No',
    align: 'left',
    field: (row) => row.roomNo,
    format: (val) => `${val}`,
    sortable: true
  },
  { name: 'RoomType', label: 'Room Type', align: 'left', field: 'RoomType' },
  { name: 'Schedule', label: 'Schedule', align: 'left', field: 'Schedule' },
  { name: 'Standard', label: 'Standard', align: 'left', field: 'Standard' },
  { name: 'Actual', label: 'Actual', align: 'left', field: 'Actual' },
  { name: 'Remarks', label: 'Remarks', align: 'left', field: 'Remarks' },
  { name: 'Pic', label: 'PIC', align: 'center', field: 'Pic' },
  { name: 'Status', label: 'Status', align: 'center', field: 'Status' }
]

const rows = [
  {
    roomNo: '101',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '102',
    RoomType: 'DLX',
    Schedule: '07.45 - 08.00',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: '-',
    Pic: 'Sprei masih kotor',
    Status: 'clean'
  },
  {
    roomNo: '103',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '104',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '105',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '106',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '107',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '108',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '109',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  },
  {
    roomNo: '110',
    RoomType: 'DLX',
    Schedule: '07.00 - 07.40',
    Standard: '40 Minute',
    Actual: '45 Minute',
    Remarks: 'Kamar berantakan',
    Pic: 'Sprei masih kotor',
    Status: 'Re-clean'
  }
]
export default {
  name: 'DashboardSPVPage',
  data() {
    return {
      rows,
      columns,
      selected: [],
      maxRating: 5,
      selectedRating: 0
    }
  },
  setup() {
    return {
      group: ref(null),
      options: [
        { label: 'Vacant Clean Checked', value: 'vacant-clean-checked', color: 'primary' },
        { label: 'Vacant Clean Unchecked', value: 'vacant-clean-unchecked', color: 'primary' },
        { label: 'Vacant Dirty', value: 'vacant-dirty', color: 'primary' },
        { label: 'Occupied Cleaned', value: 'occupied-cleaned', color: 'primary' },
        { label: 'Occupied Dirty', value: 'occupied-dirty', color: 'primary' },
        { label: 'Expected Departure', value: 'expected_departure', color: 'primary' },
        { label: 'Do not Disturb', value: 'do-not-disturb', color: 'primary' },
        { label: 'Out Of Order', value: 'out_of_order', color: 'primary' },
        { label: 'Off Market', value: 'off-market', color: 'primary' }
      ]
    }
  },
  components: {
    UserGreet,
    IMPPSSelectedTable
  },
  methods: {
    getTableData(data) {
      this.selected = data
    },
    getStarIcon(index) {
      if (index < this.selectedRating) {
        return 'r_star_rate'
      } else {
        return 'r_star_border'
      }
    },
    getStarColor(index) {
      return index < this.selectedRating ? 'yellow-8' : 'grey'
    },
    setRating(rating) {
      this.selectedRating = rating
    }
  }
}
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
</style>
