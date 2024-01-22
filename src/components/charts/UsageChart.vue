<template>
    <apexchart style="padding: 0 20px;" type="bar" :options="chartOptions" :series="seriesData"></apexchart>
</template>

<script>
export default {
    name: 'usagechart',
    data() {
        return {
            seriesData: [{
                name: 'Daily Room Usage',
                data: [100, 70, 90, 40, 35, 75, 30, 95, 100, 85]
            }],
            chartOptions: {
                chart: {
                type: 'bar',
                },
                plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
                },
                dataLabels: {
                enabled: false,
                },
                xaxis: {
                    categories: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110'],
                },
                fill: {
                    colors: [
                    function({ value, seriesIndex, w }) {
                        if (value <= 40) {
                        return '#FEEB74';
                        } else if (value <= 80) {
                        return '#77CE7F';
                        } else {
                        return '#0194F3';
                        }
                    }
                    ]
                },
            },
            legend: {
                show: true, // Menampilkan legenda
                labels: ['Low', 'Medium', 'High']
            }
        }
    }
}
</script>