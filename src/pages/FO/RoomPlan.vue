<template>
  <q-page class="column" style="overflow-y: hidden; min-width: max-content">
    <FOMenubar>
      <template #left>
        <q-btn-dropdown
          flat
          square
          class="text-capitalize"
          label="TDate - FDate"
          icon="o_event"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
        </q-btn-dropdown>
      </template>
    </FOMenubar>
    <div class="q-px-xl q-py-md">
      <q-select outlined dense v-model="floor" :options="floorOptions" style="width: fit-content" />
      <div class="flex">
        <img
          src="/src/assets/img/Roomplan.png"
          style="width: 1200px"
          alt="roomplan"
          class="q-mx-auto"
        />
      </div>
    </div>

    <div class="flex justify-center items-start q-mt-xl">
      <template v-for="(group, i) in subGroupingArray(statuses, 3)" :key="i">
        <q-separator vertical size="13px" v-if="i != 0" />
        <div class="q-mx-md">
          <p
            v-for="(status, j) in group"
            :key="j"
            class="q-mb-none q-py-sm q-px-xl text-center"
            :style="`background-color: #${status.rowColor}; color: #${status.textColor}`"
          >
            {{ status.shortDescription }}
            {{ status.longDescription ? `= ${status.longDescription}` : '' }}
          </p>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'
import { subGroupingArray } from 'src/utils/arrays'

const datePicker = ref({ from: '2020/07/08', to: '2020/07/17' })

const floor = ref('Floor 1'),
  floorOptions = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4']

const statuses = [
  {
    shortDescription: 'VC',
    longDescription: 'Vacant Clean',
    rowColor: 'ffffff',
    textColor: '000000'
  },
  {
    shortDescription: 'VD',
    longDescription: 'Vacant Dirty',
    rowColor: '10780a',
    textColor: 'ffffff'
  },
  {
    shortDescription: 'VCU',
    longDescription: 'Vacant Clean Unchecked',
    rowColor: '02feff',
    textColor: '000000'
  },
  {
    shortDescription: 'OC',
    longDescription: 'Occupied Clean',
    rowColor: 'ffffff',
    textColor: '2196f3'
  },
  {
    shortDescription: 'OD',
    longDescription: 'Occupied Dirty',
    rowColor: '0000f1',
    textColor: 'ffffff'
  },
  {
    shortDescription: 'ED',
    longDescription: 'Expected Departure',
    rowColor: 'fffc06',
    textColor: 'f44336'
  },
  {
    shortDescription: 'DnD',
    longDescription: 'Do not Disturb',
    rowColor: '850179',
    textColor: 'ffffff'
  },
  {
    shortDescription: 'OO',
    longDescription: 'Out of Order',
    rowColor: '000000',
    textColor: 'f44336'
  },
  {
    shortDescription: 'OM',
    longDescription: 'Out of Market',
    rowColor: '000000',
    textColor: 'f44336'
  },
  {
    shortDescription: 'VIP',
    longDescription: '',
    rowColor: 'ffffff',
    textColor: 'f44336'
  },
  {
    shortDescription: 'INCOGNITO',
    longDescription: '',
    rowColor: 'f10000',
    textColor: 'ffffff'
  }
]

export default defineComponent({
  name: 'RoomPlanPage',
  components: { FOMenubar },
  data() {
    return {
      datePicker,
      statuses,
      subGroupingArray,
      floor,
      floorOptions
    }
  },
  methods: {}
})
</script>
