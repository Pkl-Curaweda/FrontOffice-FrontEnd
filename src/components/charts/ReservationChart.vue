<template>
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
    name: 'reservationchart',
    data() {
        return {
            series: [{
                name: 'Arrival',
                data: [40, 40, 40, 40, 40, 40, 40]
            }, {
                name: 'Departure',
                data: [70, 70, 70, 70, 70, 70, 70]
            }, {
                name: 'Occupancy',
                data: [100, 100, 100, 100, 100, 100, 100]
            }],
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 100, 
                    width: 100
                },
                responsive: [{
                    breakpoint: 80,
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
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
                    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
                },
                fill: {
                    colors: [
                    '#0194F3',
                    '#77CE7F',
                    '#FEEB74'
                    ]
                },
                legend: {
                    markers: {
                        fillColors: [
                            '#0194F3',
                            '#77CE7F',
                            '#FEEB74'
                        ]
                    }
                },
            },

        }
    }
}
</script>