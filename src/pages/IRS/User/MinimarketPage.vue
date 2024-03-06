<template>
  <q-page class="q-pa-md">
    <Cart :data="data" :handle-click="handleClick" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Cart from 'src/components/Cart.vue'

export default defineComponent({
  components: { Cart },
  setup() {
    return {
      data: ref([])
    }
  },
  data() {
    return {
      api: new this.$Api('inroomservice'),
      count: 0
    }
  },
  mounted() {
    this.getDataMinimarket()
  },
  methods: {
    getDataMinimarket() {
      this.loading = true
      this.api.get(`services/1`, ({ data, message, status }) => {
        if (status == 200) {
          console.log(data)
          this.data = data
        }
      })
    },
    formating(value) {
      return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    }
  },
  handleClick(){
    console.log('success')
  }
})
</script>

<style></style>
}
