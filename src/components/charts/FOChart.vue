<template>
  <apexchart type="donut" width="400" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import { defineComponent, toRaw, ref } from 'vue'

export default defineComponent({
  name: 'fochart',
  setup() {
    return {
      chartOptions: {
        chart: {
          type: 'donut',
          height: 400,
          width: 400
        },
        responsive: [
          {
            breakpoint: 480
          }
        ],
        labels: [
          '101 - DLX - K',
          '109 - FML - S',
          '107 - STD - T',
          '110 - FML - S',
          '102 - DLX - T',
          ' 106 - STD - K',
          '108 - FML - S',
          '103 - DLX - K',
          '104 - DLX - T',
          '105 - STD - T'
        ],
        fill: {
          colors: [
            '#77CE7F',
            '#00FFE0',
            '#2B8DFF',
            '#688CD3',
            '#A468D3',
            '#FFE500',
            '#FFA800',
            '#FE0001',
            '#B9B9B9',
            '#000000'
          ]
        },
        legend: {
          position: 'left',
          markers: {
            fillColors: [
              '#77CE7F',
              '#00FFE0',
              '#2B8DFF',
              '#688CD3',
              '#A468D3',
              '#FFE500',
              '#FFA800',
              '#FE0001',
              '#B9B9B9',
              '#000000'
            ]
          }
        }
      }
    }
  },
  data() {
    return {
      series: ref(),
      api: new this.$Api('frontoffice'),
      data: []
    }
  },
  mounted() {
    this.fetchChart()
  },
  methods: {
    fetchChart() {
      this.loading = true
      this.api.get(`detail/report/month`, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          this.formatData(data.detail)
        }
      })
    },
    formatData(raw = []) {
      const list = []

      raw = Object.values(raw)
      raw.forEach((chrt) => {
        console.log(chrt.percent)
        list.push(chrt.percent) + '%'
      })
      this.series = list
    }
  }
})
</script>
