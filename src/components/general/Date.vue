<template>
  <q-btn
    unelevated
    dense
    outline
    class="q-px-sm"
    style="border-radius: 8px; color: #d9d9d9"
    @click="() => (clicked = !clicked)"
  >
    <div class="row items-center q-gutter-sm">
      <q-icon name="o_calendar_today" color="primary" size="20px" />
      <div class="text-body2 text-weight-medium q-pt-xs text-black">{{ formattedDate }}</div>
      <q-icon
        name="expand_more"
        color="primary"
        size="20px"
        :class="{ 'rotate-180': clicked }"
        style="transition: 0.5s"
      />
    </div>
    <q-popup-proxy transition-show="jump-down" transition-hide="jump-up">
      <q-date v-model="originalDate">
        <div class="row items-center justify-end q-gutter-sm">
          <q-btn
            label="Cancel"
            color="primary"
            flat
            v-close-popup
            @click="() => (clicked = !clicked)"
          />
          <q-btn label="OK" color="primary" flat @click="originalToFormatted" v-close-popup />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-btn>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FormDate',
  emits: ['getDate'],
  setup() {
    return {
      originalDate: ref(''),
      formattedDate: ref('')
    }
  },
  data() {
    return {
      clicked: ref(false)
    }
  },
  methods: {
    // Utuk menampilkan date dengan format dd/mm/yyyy
    setFormattedDate() {
      const day = this.$Helper.getDay()
      const month = this.$Helper.getMonth()
      const year = this.$Helper.getYear()
      this.formattedDate = day + '/' + month + '/' + year
    },

    // Utuk model date quasar dengan format yyyy/mm/dd
    setOriginalDate() {
      const day = this.$Helper.getDay()
      const month = this.$Helper.getMonth()
      const year = this.$Helper.getYear()

      this.originalDate = year + '/' + month + '/' + day
    },

    // Mengubah original date ke formatted date agar tampilan pada input = dd/mm/yyyy tanpa menganggu value dari original date
    originalToFormatted() {
      const parts = this.originalDate.split('/')
      const formatted = `${parts[2]}/${parts[1]}/${parts[0]}`
      this.formattedDate = formatted
      this.clicked = !this.clicked

      //Mengirim original date kepada page pengguna untuk di olah
      this.$emit('getDate', this.originalDate)
    }
  },
  mounted() {
    this.setFormattedDate()
    this.setOriginalDate()
    this.$emit('getDate', this.originalDate)
  }
}
</script>
