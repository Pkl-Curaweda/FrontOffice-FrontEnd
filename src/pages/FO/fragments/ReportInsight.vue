<template>
  <div class="column q-pa-md" style="background: #fafafa">
    <div class="row" style="gap: 10px">
      <!--Display Option-->
      <q-select
        outlined
        dense
        v-model="displayOpt"
        :options="displayOption"
        label="Display Option"
        dropdown-icon="expand_more"
        style="width: 150px"
      />
      <!-- date picker  -->
      <q-btn-dropdown
        outline
        class="text-capitalize"
        label="TDate - FDate"
        icon="o_event"
        dropdown-icon="o_expand_more"
      >
        <div>
          <q-date v-model="datePicker" range />
        </div>
      </q-btn-dropdown>
    </div>

    <div class="row no-wrap q-my-lg" style="gap: 16px">
      <FOChart />
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_diamond" />
          </div>
          <p class="text-h6 text-bold">OCCUPIED</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center">{{ deluxeRoom || 0 }}</p>
          <p class="text-h6 text-bold">DELUXE ROOM</p>
        </div>
      </div>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_bed" />
          </div>
          <p class="text-h6 text-bold">OCCUPIED</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center">{{ standardRoom || 0 }}</p>
          <p class="text-h6 text-bold">STANDARD ROOM</p>
        </div>
      </div>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_groups" />
          </div>
          <p class="text-h6 text-bold">OCCUPIED</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center">{{ familyRoom || 0 }}</p>
          <p class="text-h6 text-bold">FAMILY ROOM</p>
        </div>
      </div>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_trending_up" />
          </div>
          <p class="text-h6 text-bold">OCCUPIED</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center">{{ roomRes || 0 }}</p>
          <p class="text-h6 text-bold">ROOM RES</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'

const FOChart = defineAsyncComponent(() => import('components/charts/FOChart.vue'))

export default defineComponent({
  name: 'ReportInsight',
  components: {
    FOChart
  },
  setup() {
    return {
      displayOption: ['Per-Day', 'Per-Week', 'Per-Month', 'Per-Years'],
      deluxeRoom: ref(),
      standardRoom: ref(),
      familyRoom: ref(),
      roomRes: ref()
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      data: []
    }
  },
  mounted() {
    this.getDetailReport()
  },
  methods: {
    getDetailReport() {
      this.loading = true
      this.api.get(`detail/report`, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { total } = data
          console.log(total)
          this.deluxeRoom = total.DELUXE
          this.standardRoom = total.STANDARD
          this.familyRoom = total.FAMILY
          this.roomRes = total.RESERVATION
        }
      })
    }
  }
})
</script>
