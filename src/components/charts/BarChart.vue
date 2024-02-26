<template>
  <div id="chart">
    <apexchart type="bar" height="200" ref="barChart" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const series = ref([
  {
    data: []
  }
])

const chartOptions = {
  chart: {
    type: 'bar',
    height: 430
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top'
      }
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    categories: [
      'Vacant Clean',
      'Vacant Clean Unchecked',
      'Vacant Dirty',
      'Occupied Clean',
      'Occupied Dirty'
    ]
  }
}

export default defineComponent({
  name: 'BarChart',
  setup() {
    return {
      series,
      chartOptions
    }
  },
  data() {
    return {
      api: new this.$Api('root')
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

      let url = `dashboard`

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { hk } = data

          this.series = [
            {
              data: [hk.vc, hk.vcu, hk.vd, hk.oc, hk.od]
            }
          ]
          this.$refs.barChart.updateSeries(this.series)

        }
      })
    }
  }
})
</script>
