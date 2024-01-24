<template>
  <q-btn-dropdown
    class="date-btn"
    align="left"
    dropdown-icon="expand_more"
    icon="calendar_today"
    color="grey"
    :label="formattedDate"
    no-caps
    outline
  >
    <q-date v-model="inputtedDate" @change="formatDate" color="green" today-btn />
  </q-btn-dropdown>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'DateInputComponent',
  setup() {
    return {
      inputtedDate: ref('2023/01/01'),
      formattedDate: ref('')
    }
  },
  mounted() {
    this.formatDate()
  },
  watch: {
    inputtedDate(newDate) {
      this.inputtedDate = newDate
      this.formatDate()
    }
  },
  methods: {
    formatDate() {
      const date = new Date(this.inputtedDate)

      this.formattedDate = date.toLocaleDateString('en-gb', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })

      this.$emit('getDate', this.inputtedDate)
      this.$emit('getFormattedDate', this.formattedDate)
    }
  }
})
</script>

<style>
.date-btn {
  width: fit-content;
  padding: 0 4px 0px 8px;
  color: #d9d9d9 !important;
}
.date-btn .q-btn__content {
  color: black;
  justify-content: space-between;
}
.date-btn .q-btn__content .on-left {
  color: rgba(22, 167, 92, 1);
}
</style>
