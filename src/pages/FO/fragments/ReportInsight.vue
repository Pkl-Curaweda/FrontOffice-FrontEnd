<template>
  <div class="column q-pa-md" style="background: #FAFAFA">
    <div class="row" style="gap: 10px">
      <!--Display Option-->
      <q-select
          outlined
          dense
          v-model="displayOpt"
          :options="displayOption"
          label="Display Option"
          dropdown-icon="expand_more"
          style="width: 150px;"
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

    <div class="row no-wrap q-my-lg" style="gap: 16px;">
      <div id="chart" class="dashboard-box"></div>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_diamond" />
          </div>
          <p class="text-h6 text-bold">OCCUPIED</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center">10</p>
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
          <p class="text-h2 data text-center">10</p>
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
          <p class="text-h2 data text-center">10</p>
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
          <p class="text-h2 data text-center">10</p>
          <p class="text-h6 text-bold">ROOM RES</p>
        </div>
      </div>
    </div>

  </div>
  

</template>

<script>
import { defineComponent } from 'vue'
import ApexCharts from 'apexcharts'

var options = {
  chart: {
    type: 'donut'
  },
  series: [33, 27, 20, 10, 6, 4, 3, 2, 1, 0],
  labels: ['101 - DLX - K', '109 - FML - S', '107 - STD - T', '110 - FML - S',
          '102 - DLX - T', ' 106 - STD - K', '108 - FML - S', '103 - DLX - K',
          '104 - DLX - T', '105 - STD - T'],
  fill: {
    colors: ['#77CE7F', '#00FFE0', '#2B8DFF', '#688CD3', '#A468D3', '#FFE500', '#FFA800', '#FE0001', '#B9B9B9', '#000000']
  },
  legend: {
    markers: {
      fillColors: ['#77CE7F', '#00FFE0', '#2B8DFF', '#688CD3', '#A468D3', '#FFE500', '#FFA800', '#FE0001', '#B9B9B9', '#000000']
    }
  },
  plotOptions: {
    pie: {
      size: 400,
      donut: {
        labels: {
          show: true,
          name: 'person'
        }
      }
    }
  }
    
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();

export default defineComponent({
  name: 'ReportInsight',
  setup () {
    return {
      displayOption: ['Per-Day', 'Per-Week', 'Per-Month', 'Per-Years']
    }
  },
})
</script>
