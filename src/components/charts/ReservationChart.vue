<template>
  <apexchart
    style="padding: 0 20px"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import { defineComponent, ref } from 'vue'
const series = ref([])

const chartOptions = ref({
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
    categories: []
  },
  fill: {
    colors: ['#0194F3', '#77CE7F', '#FEEB74']
  },
  legend: {
    markers: {
      fillColors: ['#0194F3', '#77CE7F', '#FEEB74']
    }
  }
})

export default defineComponent({
  name: 'reservationchart',

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
    this.getDay()
  },
  methods: {
    getDay() {
      this.loading = true
      this.api.get(`dashboard`, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          this.formatData(data.resvChart)
          const { resvChart } = data

          // Mapping of full day names to abbreviations
          const dayAbbreviations = {
            Sunday: 'Sun',
            Monday: 'Mon',
            Tuesday: 'Tue',
            Wednesday: 'Wed',
            Thursday: 'Thu',
            Friday: 'Fri',
            Saturday: 'Sat'
          }

          // Extracting and abbreviating day identifiers
          const dayIdentifiers = Object.keys(resvChart).map((fullDay) => dayAbbreviations[fullDay])

          // Populating series data based on API response
          this.series = [
            {
              name: 'Arrival',
              data: Object.values(resvChart).map((dayData) => dayData.nw)
            },
            {
              name: 'Departure',
              data: Object.values(resvChart).map((dayData) => dayData.ci)
            },
            {
              name: 'Occupancy',
              data: Object.values(resvChart).map((dayData) => dayData.nw)
            }
          ]

          this.chartOptions = {
            xaxis: {
              categories: dayIdentifiers
            }
          }
        }
      })
    },
    formatData(raw = []) {
      const list = []
      raw = Object.values(raw)
      raw.forEach((fp) => {
        list.push(fp.ident)
      })
      this.categories = list
    }
  }
})

</script>
