<template>
    <apexchart type="donut" width="400" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
    name: 'fochart',
    data() {
        return {
            series: [33, 27, 20, 10, 6, 4, 3, 2, 1, 0],
            chartOptions: {
                chart: {
                type: 'donut',
                height: 400, 
                width: 400
                },
                responsive: [{
                breakpoint: 480,
                }],
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
                },
            },

        }
    }
}
</script>