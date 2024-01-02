<template>
  <div class="full-width">
    <div class="row q-pt-sm" style="gap: 5px">
      <div style="background-color: #008001; color: white; width: 700px" class="q-py-sm q-pl-sm">
        0.00
      </div>
      <div style="background-color: #008001; width: 20px"></div>
      <div style="background-color: #e4e4e4; color: #008444" class="q-pa-sm">
        <q-icon name="north_west" size="20px" />
      </div>
      <div style="background-color: #fdfd06" class="q-pa-sm">
        <q-icon name="north_east" size="20px" />
      </div>
      <div style="background-color: #fdfd06" class="q-py-sm col-grow q-pl-sm">00.0</div>
    </div>

    <div class="row items-center q-mt-md full-width" style="gap: 7px">
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Description:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          Blanket
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Qty:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          1
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Rate:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          30,000
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Amount:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          30,000
        </div>
      </div>
      <div class="items-center col-grow">
        <div class="text-bold row" style="justify-content: space-between">
          <div></div>
          <div>Rp 0.00</div>
        </div>
        <q-separator class="" style="background: rgba(0, 0, 0, 0.5)" size="1.5px" />
      </div>
      <div class="items-center col-grow">
        <div class="text-bold row" style="justify-content: space-between">
          <div>Balance</div>
          <div>Rp 0.00</div>
        </div>
        <q-separator class="" style="background: rgba(0, 0, 0, 0.5)" size="1.5px" />
      </div>

      <div class="row" style="gap: 7px">
        <q-btn unelevated dense class="text-capitalize q-px-sm" color="primary" label="Invoice" />
        <q-btn
          flat
          square
          color="primary"
          icon="o_find_in_page"
          class="border-button rounded-borders"
          style="padding: 6px 3px"
        />
        <q-btn
          flat
          square
          color="primary"
          icon="o_print"
          class="border-button rounded-borders"
          style="padding: 6px 3px"
        />
      </div>
    </div>

    <div class="row q-mt-sm" style="gap: 7px">
      <q-expansion-item
        dense
        style="font-weight: bold"
        label="Bill Address"
        class="padding-expansion col-grow"
      >
        <q-card>
          <q-input
            v-model="textarea"
            label="Note..."
            dense
            outlined
            style="max-height: 200px"
            type="textarea"
          />
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        dense
        style="font-weight: bold"
        label="Comments"
        class="padding-expansion col-grow"
      >
        <q-card>
          <q-input
            v-model="textarea"
            label="Note..."
            dense
            outlined
            style="max-height: 200px"
            type="textarea"
          />
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InvoiceForm'
})
</script>
