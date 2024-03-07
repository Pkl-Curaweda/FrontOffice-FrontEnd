<template>
  <div>
    <q-card class="my-card q-my-md" flat bordered v-for="(list, index) in data" :key="index">
      <q-card-section horizontal style="justify-content: space-between">
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">{{ list.name }}</div>
          <div class="text-caption text-grey">
            {{ list.desc }}
          </div>
          <div>{{ formating(list.price) }}</div>
        </q-card-section>

        <q-card-section class="col-4 flex flex-center">
          <q-img class="rounded-borders" :src="list.picture" />
        </q-card-section>
      </q-card-section>

      <q-separator />
      <q-card-actions style="justify-content: space-between; display: flex; gap: 5px">
        <q-btn flat color="primary" no-caps @click="handleClick"> Buy </q-btn>
        <div style="display: flex; align-items: center">
          <q-btn color="primary" @click="count--" flat no-caps square> - </q-btn>
          <div style="padding: auto; display: flex; align-items: center; justify-content: center">
            {{ count }}
          </div>
          <q-btn color="primary" @click="count++" flat no-caps square> + </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Cart',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    handleClick: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const count = ref(0)

    const formating = (value) => {
      return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    }

    return {
      count,
      formating
    }
  },
  method: {
    handleClick() {
      this.handleClick()
    }
  }
})
</script>

<style></style>
