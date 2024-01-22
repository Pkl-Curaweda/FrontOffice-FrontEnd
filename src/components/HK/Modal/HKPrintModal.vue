<template>
  <q-btn padding="4px" flat @click="model = true">
    <q-icon size="36px" style="color: #008444" name="o_print" />
  </q-btn>

  <q-dialog v-model="model" maximized>
    <q-card
      class="flex"
      style="flex-wrap: nowrap"
      :style="`flex-direction: ${$q.screen.lt.md ? 'column-reverse' : 'row'}`"
    >
      <q-card-section
        class="column items-center"
        style="
          flex: 3 3 0%;
          border: 8px solid #f5f5f5;
          border-radius: 8px;
          overflow: auto;
          flex-wrap: nowrap;
          height: fit-content;
        "
      >
        <q-img
          src="../../../assets/img/lingian-logo-colored.png"
          fit="contain"
          style="width: 150px; height: 150px; overflow: visible"
        />

        <span class="full-width" style="border: 3px solid #16a75c; margin-block: 16px" />

        <!-- Content -->
        <div class="full-width">
          <div style="margin-bottom: 12px">Date : {{ formatDate(new Date()) }}</div>

          <!-- Table -->
          <div class="print-table">
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
              :rows-per-page-options="[0]"
              :hide-pagination="true"
              :dense="$q.screen.lt.md"
            />
          </div>
        </div>

        <span class="full-width" style="border: 3px solid #16a75c; margin-top: 40px" />

        <div style="margin-top: 8px">
          <div :style="`max-width: ${$q.screen.lt.md ? '90%' : '40%'}`">
            Gedung Lingian, Universitas Telkom, Jl. Telekomunikasi No.01, Terusan Buahbatu, Bandung,
            Jawa Barat 40257 ; Phone. +62 8112072999
          </div>
        </div>
      </q-card-section>

      <!-- Right Side -->
      <q-card-section
        style="flex: 2 2 0%; top: 0"
        :style="`position: ${$q.screen.lt.md ? 'relative' : 'sticky'}`"
      >
        <!-- Close Btn -->
        <div class="full-width flex justify-end">
          <q-btn icon="close" flat round dense v-close-popup />
        </div>

        <table class="full-width q-mt-lg">
          <tr>
            <td>Print</td>
            <td align="right">2 Pages</td>
          </tr>
          <tr>
            <td>Forecast</td>
            <td align="right">
              <q-select
                outlined
                dense
                v-model="forecastModel"
                dropdown-icon="expand_more"
                :options="forecastOptions"
                style="width: 12rem"
                class="print-selects"
              >
                <template v-slot:prepend>
                  <q-icon name="calendar_today" />
                </template>
              </q-select>
            </td>
          </tr>
          <tr>
            <td>Destination</td>
            <td align="right">
              <q-select
                outlined
                dense
                v-model="destinationModel"
                dropdown-icon="expand_more"
                :options="destinationOptions"
                style="width: 12rem"
                class="print-selects"
              >
                <template v-slot:prepend>
                  <q-icon name="note" style="transform: rotateX(180deg) rotateZ(90deg)" />
                </template>
              </q-select>
            </td>
          </tr>
          <tr>
            <td>Pages</td>
            <td align="right">
              <q-select
                outlined
                dense
                v-model="pagesModel"
                dropdown-icon="expand_more"
                :options="pagesOptions"
                style="width: 12rem"
                class="print-selects"
              />
            </td>
          </tr>
          <tr>
            <td>Pages per sheet</td>
            <td align="right">
              <q-select
                outlined
                dense
                v-model="pagesPerSheetModel"
                dropdown-icon="expand_more"
                :options="pagesPerSheetOptions"
                style="width: 12rem"
                class="print-selects"
              />
            </td>
          </tr>
          <tr>
            <td>Margins</td>
            <td align="right">
              <q-select
                outlined
                dense
                v-model="marginsModel"
                dropdown-icon="expand_more"
                :options="marginsOptions"
                style="width: 12rem"
                class="print-selects"
              />
            </td>
          </tr>
        </table>

        <!-- BTNs -->
        <div
          class="flex"
          :class="$q.screen.lt.md ? 'q-mt-md' : 'absolute'"
          style="gap: 8px; bottom: 24px; right: 24px; justify-content: end"
        >
          <q-btn
            label="Print"
            dense
            unelevated
            color="primary"
            no-caps
            style="padding: 4px 16px; border-radius: 8px"
          />
          <q-btn
            label="Save"
            dense
            unelevated
            color="primary"
            no-caps
            style="padding: 4px 16px; border-radius: 8px"
          />
          <q-btn
            label="Cancel"
            dense
            unelevated
            outline
            color="primary"
            no-caps
            v-close-popup
            style="padding: 4px 16px; border-radius: 8px"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HKPrintModal',
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {
      model: ref(false),
      forecastModel: ref('Per-Day'),
      forecastOptions: ['Per-Day', 'Per-Month', 'Per-Year'],
      destinationModel: ref('Save as PDF'),
      destinationOptions: ['Save as PDF', 'Save as DOCX', 'Save as PNG'],
      pagesModel: ref('All'),
      pagesOptions: ['All', 1, 2],
      pagesPerSheetModel: ref(1),
      pagesPerSheetOptions: [1, 2, 3],
      marginsModel: ref('Default'),
      marginsOptions: ['Default']
    }
  },
  methods: {
    formatDate(date) {
      return [
        date.getDate().toString().padStart(2, '0'),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getFullYear()
      ].join('/')
    }
  }
})
</script>

<style>
.print-selects .q-field__control::before {
  border-color: #d9d9d9 !important;
}
.print-selects .q-field__label {
  color: black;
}
.print-selects .q-icon {
  color: #008444;
}

.print-table .q-table th {
  border-top-width: 0;
  border-right-width: 4px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
}
.print-table .q-table tbody td {
  font-size: 14px;
  border-right: 4px solid white;
}
.print-table .q-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}
.print-table .q-table__bottom {
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
.print-table .q-table__control:nth-child(2) {
  position: absolute;
}
.print-table .q-table__bottom .q-btn .q-icon {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #069550;
}
.print-table .disabled * {
  opacity: 0;
}
</style>
