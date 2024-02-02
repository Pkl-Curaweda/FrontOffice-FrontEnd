<template>
  <q-page class="flex flex-center">
    <HKCard
      title="Extrabed Availibility"
      radius="25px"
      card_class="full-width q-px-lg flex q-mt-xl"
    >
      <q-btn flat square color="primary" icon="o_print" style="justify-content: flex-end" />
      <div class="justify-between row q-mb-sm" style="width: 100%">
        <!-- ==========Date=============== -->
        <div class="row" style="gap: 16px">
          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 14px; font-weight: 500">From Date :</span>
            <HKDateInput />
          </div>

          <div class="flex items-center" style="gap: 8px">
            <span style="font-size: 14px; font-weight: 500">To Date :</span>
            <HKDateInput />
          </div>
        </div>
        <!-- ====== -->
        <div class="row items-center" style="column-gap: 8px">
          <span style="font-size: 14px; font-weight: 500">Sorting :</span>
          <q-select
            outlined
            dense
            v-model="sortingModel"
            dropdown-icon="expand_more"
            :options="sortingOptions"
            style="width: 12rem"
            class="input-border"
            @input="onSortingChange"
          />
        </div>
      </div>
      <HKTable :columns="tableColumns" :rows="tableRows" style="width: 100%" />
    </HKCard>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'
import HKTable from 'src/components/HK/Table/HKTable.vue'
import HKDateInput from 'src/components/HK/Form/HKDateInput.vue'

const tableColumns = [
  {
    name: 'date',
    label: 'Date',
    field: 'date',
    align: 'left',
    required: true,
    sortable: true
  },
  {
    name: 'room_no',
    label: 'Room No',
    field: 'room_no',
    align: 'left',
    sortable: true
  },
  {
    name: 'used',
    label: 'Used',
    field: 'used',
    align: 'left',
    sortable: true
  },
  {
    name: 'remain',
    label: 'Remain',
    field: 'remain',
    align: 'left',
    sortable: true
  }
]

const tableRows = ref()

export default defineComponent({
  name: 'ExtrabedPage',
  components: { HKCard, HKDateInput, HKTable },
  setup() {
    return {
      sortingModel: ref('Extra Bed'),
      sortingOptions: ['Extra Bed', 'Pillow', 'Blanket'],
      tableColumns,
      tableRows
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping')
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    sortingModel(newValue) {
      this.fetchData(newValue)
    }
  },
  methods: {
    fetchData(selectedOption) {
      this.loading = true

      let url = `amenities`

      switch (selectedOption) {
        case 'Extra Bed':
          url = 'amenities/110?'
          break
        case 'Pillow':
          url = 'amenities/109?'
          break
        case 'Blanket':
          url = 'amenities/108?'
          break
        default:
          // Default to 'Extra Bed' if no match
          url = 'amenities/110?'
          break
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { extra } = data

          this.tableRows = extra.map((e) => ({
            date: e.date,
            room_no: e.roomNo,
            used: e.used,
            remain: e.remain
          }))
        }
      })
    }
  }
})
</script>
