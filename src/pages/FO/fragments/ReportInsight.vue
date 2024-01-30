<template>
  <div class="column q-pa-md" style="background: #fafafa">
    <div class="row" style="gap: 10px">
      <!--Display Option-->
      <q-btn-dropdown
        flat
        square
        style="border: 1px #00000030 solid"
        class="text-capitalize text-black rounded-borders"
        label="Display Option"
        color="primary"
        dropdown-icon="o_expand_more"
      >
        <q-list>
          <q-item clickable v-close-popup @click="setFilterDisplay('day')">
            <q-item-section>Day</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="setFilterDisplay('week')">
            <q-item-section>Week</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="setFilterDisplay('month')">
            <q-item-section>Month</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="setFilterDisplay('year')">
            <q-item-section>Year</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <!-- date picker  -->
      <q-btn-dropdown
        flat
        square
        style="border: 1px #00000030 solid"
        class="text-capitalize date-btn text-black rounded-borders"
        label="Date"
        icon="o_event"
        color="primary"
        dropdown-icon="o_expand_more"
      >
        <div>
          <q-date v-model="datePicker" />
        </div>
      </q-btn-dropdown>
    </div>

    <div class="row no-wrap q-my-lg" style="gap: 16px">
      <apexchart type="donut" width="400" :options="chartOptions" :series="series"></apexchart>
      <div class="dashboard-box column">
        <div class="row q-py-sm q-mt-lg" style="gap: 10px">
          <div class="icon">
            <q-icon name="o_diamond" />
          </div>
          <p class="text-h6 text-bold">OCCUPIED</p>
        </div>
        <div class="">
          <p class="text-h2 data text-center q-pb-lg">{{ deluxeRoom || 0 }}</p>
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
          <p class="text-h2 data text-center q-pb-lg">{{ standardRoom || 0 }}</p>
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
          <p class="text-h2 data text-center q-pb-lg">{{ familyRoom || 0 }}</p>
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
          <p class="text-h2 data text-center q-pb-lg">{{ roomRes || 0 }}</p>
          <p class="text-h6 text-bold">ROOM RES</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ReportInsight',
  components: {},
  setup() {
    return {
      datePicker: ref(),
      displayOption: ref('day'),
      filterDisplay: ref('day'),
      deluxeRoom: ref(),
      standardRoom: ref(),
      familyRoom: ref(),
      roomRes: ref(),
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
          '102 - DLX - K',
          '103 - DLX - K',
          '104 - DLX - K',
          '105 - FML - T',
          '106 - FML - T',
          '107 - FML - T',
          '108 - STD - S',
          '109 - STD - S',
          '110 - STD - S'
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
    this.getDetailReport()
  },
  watch: {
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        if (newDateRange) {
          // Periksa apakah newDateRange terdefinisi
          this.getDetailReport()
        }
      }
    }
  },

  methods: {
    setFilterDisplay(option) {
      this.filterDisplay = option
      this.getDetailReport()
    },
    formatAverage(num) {
      return num.toFixed(1)
    },
    getDetailReport() {
      this.loading = true

      let url = `detail/report?`

      const Date = this.datePicker?.replace(/\//g, '-')

      if (Date !== undefined && Date !== '') {
        url += `&date=${Date}`
      }

      if (this.filterDisplay !== null) {
        url += `&disOpt=${this.filterDisplay}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          this.formatData(data.detail)
          const { total } = data
          console.log(total)
          this.deluxeRoom = total.DELUXE
          this.standardRoom = total.STANDARD
          this.familyRoom = total.FAMILY
          this.roomRes = total.RESERVATION
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
