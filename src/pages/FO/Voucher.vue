<template>
  <q-page
    style="
      overflow-y: hidden;
      width: 100%;
      min-width: max-content;
      min-height: calc(100vh - 51.25px);
    "
  >
    <FOMenubar />

    <div class="my-table q-mt-sm q-mx-sm">
      <q-table class="no-shadow" :rows="data" :loading="loading" :columns="columns" row-key="name">
        <template>
          <q-tr class="table-head">
            <q-th style="padding-top: 0px; padding-bottom: 0px">
              <template v-slot:header="props">
                <q-tr class="table-head" :props="props">
                  <q-th
                    v-for="(col, i) in props.cols"
                    :key="i"
                    style="padding-top: 0px; padding-bottom: 0px"
                  >
                  </q-th>
                </q-tr>
              </template>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <template v-for="(cell, key, i) in props.row" :key="i">
              <q-td :style="cell.style">
                {{ cell.data }}
              </q-td>
            </template>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'

export default defineComponent({
  name: 'VoucherPage',
  components: { FOMenubar },
  setup() {
    return {
      columns: [
        { name: 'Date', label: 'Date', align: 'left', field: 'Date' },
        { name: 'RmAvailable', label: 'Room Available', align: 'left', field: 'RmAvailable' },
        { name: 'Occupied', label: 'Occupied', align: 'left', field: 'Occupied' },
        { name: 'Occ', label: 'Occ%', align: 'left', field: 'Occ' },
        { name: 'RmRevenue', label: 'Room Revenue', align: 'left', field: 'RmRevenue' },
        { name: 'Arr', label: 'Arr', align: 'left', field: 'Arr' },
        { name: 'RmAvail', label: `DTD Rm.Avail`, align: 'left', field: 'RmAvail' },
        { name: 'Rno', label: `DTD RNO`, align: 'left', field: 'Rno' },
        { name: 'tdOcc', label: `DTD Occ %`, align: 'left', field: 'tdOcc' },
        { name: 'tdRmRevenue', label: `DTD Rm.Revenue`, align: 'left', field: 'tdRmRevenue' },
        { name: 'tdArr', label: `DTD ARR`, align: 'left', field: 'tdArr' },
        { name: 'TaxService', label: `Tax & Service`, align: 'left', field: 'taxService' }
      ]
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      data: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true

      let url = `report?page=1&perPage=20`

      this.api.get(url, ({ status, data }) => {
        this.loading = false
        if (status == 200) {
          this.formatData(data.reports)
        }
      })
    },
    formatData(raw = []) {
      console.log
      const list = []
      raw.forEach((rp) => {
        list.push({
          Date: { data: rp.date, style: {} },
          RmAvailable: { data: rp.roomAvailable, style: {} },
          Occupied: { data: rp.occupied, style: {} },
          Occ: { data: rp.occ + '%', style: {} },
          RmRevenue: { data: rp.roomRevenue, style: {} },
          Arr: { data: rp.arr, style: {} },
          RmAvail: { data: rp.added.rm_avail, style: {} },
          Rno: { data: rp.added.rno, style: {} },
          tdOcc: { data: rp.added.occ + '%', style: {} },
          tdRmRevenue: { data: rp.added.rev, style: {} },
          tdArr: { data: rp.added.arr, style: {} },
          taxSerive: { data: rp.taxService.taxed, style: {} }
        })
      })
      console.log(this.data, list)
      this.data = list
      console.log(this.data)
    }
  }
})
</script>

<style></style>
