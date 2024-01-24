<template>
  <div class="my-table">
    <q-table
      flat
      bordered
      :rows="add"
      :columns="kolom"
      row-key="name"
      selection="single"
      v-model:selected="selected"
      hide-bottom
    />
  </div>
</template>

<script>
export default {
  name: 'TableAddInvoice',
  setup() {
    return {
      kolom: [
        { name: 'Art', label: 'Art', field: 'Art', align: 'left' },
        { name: 'Description', label: 'Description', field: 'Description', align: 'left' },
        { name: 'Qty', label: 'Qty', field: 'Qty', align: 'left' }
      ],

      add: [
        {
          Art: 'Frozen Yogurt',
          Description: 159,
          Qty: 6.0
        }
      ]
    }
  }
}
</script>
