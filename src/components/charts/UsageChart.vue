<template>
  <apexchart
    style="padding: 0 20px"
    type="bar"
    :options="chartOptions"
    :series="seriesData"
  ></apexchart>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'usagechart',
  setup() {
    const seriesData = ref([])
    const chartOptions = ref({
      chart: {
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
      },
      fill: {
        colors: [
          function ({ value, seriesIndex, w }) {
            if (value <= 40) {
              return '#FEEB74'
            } else if (value <= 80) {
              return '#77CE7F'
            } else {
              return '#0194F3'
            }
          }
        ]
      },
      legend: {
        show: true, // Menampilkan legenda
        labels: ['Low', 'Medium', 'High']
      }
    })
    return {
      seriesData,
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
      let url = `dashboard`

      this.api.get(url, ({ status, data }) => {
        if (status == 200) {
          const { hkChart } = data

          console.log(hkChart)

          this.seriesData = [
            {
              name: 'Daily Room Usage',
              data: hkChart
            }
          ]
        }
      })
    }
  }
})
</script>
