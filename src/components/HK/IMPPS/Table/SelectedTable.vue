<template>
  <div class="selected-table">
    <div v-if="btnEdit" class="q-mt-md row items-center justify-end">
      <q-btn
        dense
        flat
        rounded
        icon="sym_o_checklist"
        color="primary"
        class="q-mr-sm"
        @click="
          () => {
            selectMode = !selectMode
          }
        "
      />
    </div>
    <q-table
      v-if="isSelect && selectMode"
      :rows="rows"
      :columns="columns"
      row-key="roomNo"
      square
      :card-style="{ boxShadow: 'none' }"
      rows-per-page-label="Show"
      :hide-pagination="hidePagination"
      :dense="$q.screen.lt.md"
      :title="title"
      no-data-label="Oops! There is no data"
      selection="single"
      v-model:selected="selected"
    />
    <q-table
      v-else
      :rows="rows"
      :columns="columns"
      row-key="roomNo"
      square
      :card-style="{ boxShadow: 'none' }"
      rows-per-page-label="Show"
      :hide-pagination="hidePagination"
      :dense="$q.screen.lt.md"
      :title="title"
      no-data-label="Oops! There is no data"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IMPPSSelectedTable',
  emits: ['getTableData'],
  setup() {
    return {
      selected: ref([]),
      selectMode: ref(false)
    }
  },
  props: {
    columns: Array,
    rows: Array,
    hidePagination: Boolean,
    title: String,
    isSelect: Boolean,
    btnEdit: Boolean
  },
  watch: {
    selected() {
      this.$emit('getTableData', this.selected)
    }
  }
})
</script>

<style>
.selected-table .q-table th {
  border: 1px solid #b9b9b9;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
}
.selected-table .q-table tbody td {
  font-size: 14px;
  border-right: 4px solid white;
  border: 1px solid #b9b9b9;
}
.selected-table .q-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}
.selected-table .q-table__bottom {
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
.selected-table .q-table__control:nth-child(2) {
  position: absolute;
}
.selected-table .q-table__bottom .q-btn .q-icon {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #069550;
}
.selected-table .disabled * {
  opacity: 0;
}

.selected-table .q-table__card .q-table__top {
  justify-content: center;
  background-color: #069550;
  color: white;
  font-size: 12px;
}
</style>
