<template>
  <div :class="`tableComp ${gapColorClass}`">
    <q-table
      :rows="rows"
      :columns="columns"
      :pagination="pagination"
      :rows-per-page-options="[1, 5, 7, 10, 15, 20, 25, 30]"
      row-key="name"
      square
      :table-header-style="{
        backgroundColor: '#069550',
        color: '#ffffff',
        padding: '10px'
      }"
      hide-bottom
      :card-style="{ boxShadow: 'none' }"
      rows-per-page-label="Show"
      :dense="$q.screen.lt.md"
      :title="title"
    >
      <template v-slot:top-row v-if="showInput">
        <q-tr>
          <q-td>
            <q-select
              outlined
              v-model="roomNo"
              :options="roomNoOptions"
              dense
              dropdown-icon="expand_more"
          /></q-td>
          <q-td
            ><q-input
              outlined
              dense
              v-model="reasonRoom"
              class="input-border"
              label="Reason Room"
              style="width: fit-content"
          /></q-td>
          <q-td
            ><q-btn-dropdown
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
                <q-date v-model="datePickerArrival" color="green" today-btn />
              </div> </q-btn-dropdown
          ></q-td>
          <q-td
            ><q-btn-dropdown
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
                <q-date v-model="datePickerDeparture" color="green" today-btn />
              </div> </q-btn-dropdown
          ></q-td>
          <q-td
            ><q-input
              outlined
              dense
              class="input-border"
              style="width: fit-content"
              v-model="CreatedBy"
              disable
          /></q-td>
          <q-td>
            <q-select
              outlined
              v-model="dept"
              :options="deptOption"
              dense
              dropdown-icon="expand_more"
            />
          </q-td>
          <q-td style="display: flex; justify-content: center; align-items: center">
            <q-btn
              label="Add"
              unelevated
              color="primary"
              dense
              class="text-capitalize col-grow"
              @click="postDataTable"
            />
          </q-td>
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
    const datePickerArrival = ref()
    const datePickerDeparture = ref()
    return {
      gapColorClass: ref('gapWhite'),
      roomNoOptions: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
      roomNo: ref('Room No'),
      dept: ref(),
      datePickerArrival,
      datePickerDeparture,
      reasonRoom: ref(),
      CreatedBy: ref(),
      deptOption: [
        { label: 'ENG', value: 1 },
        { label: 'HK', value: 2 }
      ]
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping'),
      user: this.$AuthStore.getUser()
    }
  },
  props: {
    columns: Array,
    rows: Array,
    showInput: Boolean,
    hidePagination: Boolean,
    currentType: String,
    gapTable: Boolean,
    gapColor: String,
    title: String
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.CreatedBy = this.user.username
    },
    postDataTable() {
      const data = {
        roomId: this.roomNo,
        reason: this.reasonRoom,
        from: new Date(this.datePickerArrival),
        until: new Date(this.datePickerDeparture),
        departmentId: this.dept.value,
        description: 'Sended By Admin',
        xType: this.currentType
      }

      let url = `ooo-rooms`

      this.api.post(url, data, ({ status, message }) => {
        if (status == 200) {
          this.trigger('possitive', message)
        }
      })
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'error unknown action try again',
          timeout: 1000
        },
        1000
      )
    },
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
