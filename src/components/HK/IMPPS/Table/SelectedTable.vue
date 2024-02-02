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
    >
      <template v-slot:body-cell="props">
        <td :style="props.col.style" :class="{ 'q-table__bottom-item': props.isLast }">
          {{ props.col.field(props.row) }}
        </td>
      </template>
    </q-table>

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
    >
      <template v-slot:body-cell="props">
        <td
          :style="props.col.style"
          :class="{ 'q-table__bottom-item': props.isLast }"
          @click="showPopuptest"
        >
        {{ props.col.field(props.row) }}
        <q-popup v-if="selected.length > 0" ref="popup" v-model="showPopup">
          <div class="q-pa-md">
            <!-- Display additional details for the selected row here -->
            <div>Room No: {{ selected[0].roomNo }}</div>
            <div>Room Type: {{ selected[0].roomType }}</div>
            <!-- Add more details as needed -->
          </div>
        </q-popup>
        </td>
      </template>
    </q-table>
  </div>

  <!-- <q-popup-edit v-if="cell.data.label" v-model="props.row.name" title="" auto-save>
                      <q-list style="align-content: flex-end; width: 100%">
                        <q-item
                          clickable
                          v-close-popup
                          @click="getDetailform(cell.data.resvId, cell.data.resvRoomId)"
                          style="
                            display: flex;
                            padding: 5px;
                            border-radius: 30px;
                          "
                        >
                          <q-item-section>
                            <q-item-label style="color: black" class="font-bold"
                              >{{ cell.data.label? cell.data.label : ''   }}</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                      </q-list></q-popup-edit
                    > -->
  <!-- <div class="my-table">
    <q-table
      class="no-shadow"
      v-model:pagination="pagination"
      @request="onPaginationChange"
      :rows-per-page-options="[1, 5, 7, 10, 15, 20, 25, 30]"
      :rows="data"
      :loading="loading"
      :columns="columns"
      row-key="name"
    >
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
  </div> -->
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'IMPPSSelectedTable',
  emits: ['getTableData'],
  setup() {
    return {
      selected: ref([]),
      selectMode: ref(false),
      showPopup: ref(false)
    }
  },
  props: {
    columns: Array,
    rows: Array,
    style: String,
    hidePagination: Boolean,
    title: String,
    isSelect: Boolean,
    btnEdit: Boolean
  },
  watch: {
    selected() {
      this.$emit('getTableData', this.selected)
    }
  },
  methods: {
    showPopuptest() {
      this.showPopup = !this.showPopup
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
