<template>
  <apexchart
    style="padding: 0 20px"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  name: 'reservationchart',
  data() {
    return {
      api: new this.$Api('root'),
      series: [
        {
          name: 'Arrival',
          data: [40, 40, 40, 40, 40, 40, 40]
        },
        {
          name: 'Departure',
          data: [70, 70, 70, 70, 70, 70, 70]
        },
        {
          name: 'Occupancy',
          data: [100, 100, 100, 100, 100, 100, 100]
        }
      ],
      chartOptions: {
        chart: {
          type: 'bar'
        },
        responsive: [
          {
            breakpoint: 80
          }
        ],
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
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['wed']
        },
        fill: {
          colors: ['#0194F3', '#77CE7F', '#FEEB74']
        },
        legend: {
          markers: {
            fillColors: ['#0194F3', '#77CE7F', '#FEEB74']
          }
        }
      }
    }
  },
  mounted() {
    this.getDay()
  },
  methods: {
    getDay() {
      this.loading = true
      this.api.get(`dashboard`, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          this.formatData(data.resvChart)
        }
      })
    }
  },
  formatData(raw = []) {
    console.log(raw)
    const list = []
    raw = Object.values(raw)
    raw.forEach((fp) => {
      console.log(fp)
      list.push(fp.ident)
    })
    this.categories = list
  }
}
</script>
