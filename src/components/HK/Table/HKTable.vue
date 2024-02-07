<template>
  <div :class="`tableComp ${gapColorClass}`">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      square
      :table-header-style="{
        backgroundColor: '#069550',
        color: '#ffffff',
        padding: '10px'
      }"
      :card-style="{ boxShadow: 'none' }"
      rows-per-page-label="Show"
      :dense="$q.screen.lt.md"
      :title="title"
    >
      <template v-slot:top-row v-if="showInput">
        <q-tr>
          <q-td><input type="text" /></q-td>
          <q-td><input type="text" /></q-td>
          <q-td><input type="text" /></q-td>
          <q-td><input type="text" /></q-td>
          <q-td><input type="text" /></q-td>
          <q-td><input type="text" /></q-td>
          <q-td><input type="text" /></q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HKTable',

  setup() {
    return {
      gapColorClass: ref('gapWhite')
    }
  },
  props: {
    columns: Array,
    rows: Array,
    showInput: Boolean,
    hidePagination: Boolean,
    gapTable: Boolean,
    gapColor: String,
    title: String
  },
  methods: {
    getGapColor() {
      if (this.gapColor) {
        switch (this.gapColor) {
          case 'white':
            this.gapColorClass = 'gapWhite'
            break
          case 'grey':
            this.gapColorClass = 'gapGrey'
            break
          default:
            break
        }
      }
    }
  },
  created() {
    this.getGapColor()
  }
})
</script>

<style>
.tableComp.gapGrey .q-table th {
  border: 1px solid #b9b9b9;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
}
.tableComp.gapWhite .q-table th {
  border-top-width: 0;
  border-right-width: 4px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}
.tableComp .q-table tbody td {
  font-size: 14px;
  border-right: 4px solid white;
}
.tableComp .q-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}
.tableComp .q-table__bottom {
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  border-width: 2px;
  border-right-width: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-color: #069550;
  background: #fafafa;
}
.tableComp .q-table__control:nth-child(2) {
  position: absolute;
}
.tableComp .q-table__bottom .q-btn .q-icon {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #069550;
}
.tableComp .disabled * {
  opacity: 0;
}

.tableComp .q-table__card .q-table__top {
  justify-content: center;
  background-color: #069550;
  color: white;
  font-size: 12px;
}
</style>
