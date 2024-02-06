<template>
  <apexchart
    width="100%"
    height="100%"
    :options="options || defaultOptions"
    :series="series || defaultSeries"
  ></apexchart>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HKChart',
  props: {
    options: Object,
    series: Array
  },
  data() {
    return {
      defaultSeries: [50, 50],
      defaultOptions: {
        chart: {
          type: 'donut'
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#364E30', '#54854C'],
        labels: ['One', 'Two'],
        legend: {
          offsetY: 40,
          fontSize: '20px',
          fontWeight: 400,
          markers: {
            width: '20px',
            height: '20px',
            offsetX: -10
          },
          itemMargin: {
            horizontal: 0,
            vertical: 10
          }
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }
})
</script>
